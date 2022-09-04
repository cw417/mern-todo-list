import React from 'react'

export default function Todo(props) {
  return (
    <div>
      <span>{props.todo.todo}</span>
      <span> {props.todo.completed?"yes":"no"}</span>
      <span>
        <button className="btn btn-link"
          onClick={() => {
            props.deleteTodo(props.todo._id);
          }}
        >
          Delete
        </button>
      </span>
    </div>
  )
}
 