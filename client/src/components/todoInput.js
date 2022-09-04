import React, { useRef } from "react";
import { useNavigate } from "react-router";

export default function TodoInput({ addTodo }) {

  const todoInfo = useRef()

  async function onSubmit(e) {
    e.preventDefault();
    const todo = todoInfo.current.value
    addTodo(todo)
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
