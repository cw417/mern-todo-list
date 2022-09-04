import React from 'react'
import { FiTrash } from 'react-icons/fi'

export default function Todo(props) {
  return (
    <div className=''>
      <span>{props.todo.todo}</span>
      <span> {props.todo.completed?'yes':'no'}</span>
      <span>
        <button className='btn'
          onClick={() => {
            props.deleteTodo(props.todo._id);
          }}
        >
          <FiTrash />
        </button>
      </span>
    </div>
  )
}
 