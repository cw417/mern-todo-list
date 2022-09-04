import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoInput from "./todoInput";
import Todo from "./todo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getTodos() {
      const response = await fetch(`http://localhost:5000/todo/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const todos = await response.json();
      setTodos(todos)
    }

    getTodos();

    return;
  }, [todos.length]);

  async function addTodo(todo) {
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTodo = { todo: todo, completed: false };

    await fetch("http://localhost:5000/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  // This method will delete a record
  async function deleteTodo(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
    const newRecords = todos.filter((el) => el._id !== id);
    setTodos(newRecords);
  }

  // This method will map out the records on the table
  function todoList() {
    return todos.map((todo, index) => {
      return (
        <Todo
          todo={todo}
          deleteTodo={() => deleteTodo(todo._id)}
          key={index}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="container--todoList">
      <h3>Todo List</h3>
      <TodoInput addTodo={addTodo} />
      <div className="todo-list">{todoList()}</div>
    </div>  
  );
}