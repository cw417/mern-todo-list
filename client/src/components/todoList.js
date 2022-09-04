import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoInput from "./todoInput";

const Todo = (props) => (
  <tr>
    <td>{props.todo.todo}</td>
    <td>{props.todo.completed}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.todo._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteTodo(props.todo._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);
 
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
    return todos.map((todo) => {
      return (
        <Todo
          todo={todo}
          deleteTodo={() => deleteTodo(todo._id)}
          key={todo._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Todo List</h3>
      <TodoInput />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Todo</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>{todoList()}</tbody>
      </table>
    </div>
  );
}