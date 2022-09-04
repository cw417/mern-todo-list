const express = require("express");
 
// todoRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /todo.
const todoRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the todos.
todoRoutes.route("/todo").get(function (req, res) {
  let db_connect = dbo.getDb("todoList");
  db_connect
    .collection("todos")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// This section will help you get a single todo by id
todoRoutes.route("/todo/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("todos")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
 
// This section will help you create a new todo.
todoRoutes.route("/todo/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    todo: req.body.todo,
    completed: req.body.completed
  };
  db_connect.collection("todos").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});
 
// This section will help you update a todo by id.
todoRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
     todo: req.body.todo,
     completed: req.body.completed
    },
  };
  db_connect
    .collection("todos")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});
 
// This section will help you delete a todo
todoRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("todos").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
 
module.exports = todoRoutes;