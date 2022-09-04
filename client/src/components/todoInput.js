import React, { useRef } from "react";
import { useNavigate } from "react-router";

export default function TodoInput() {

  const todoInfo = useRef()

  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTodo = { todo: todoInfo.current.value, completed: false };

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
    todoInfo.current.value = null
  }

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <span>
            <input ref={todoInfo} type='text' placeholder='Todo'/>
            <button type='submit'>Add</button>
          </span>
        </form>
      </div>
    </div>
  )
}
