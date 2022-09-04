import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';

export default function TodoInput({ addTodo }) {

  const todoInfo = useRef()

  async function onSubmit(e) {
    e.preventDefault();
    const todo = todoInfo.current.value
    addTodo(todo)
    todoInfo.current.value = null
  }

  return (
    <div className='my-4'>
      <form onSubmit={onSubmit}>
        <span className='flex'>
          <input className='rounded-2xl px-4 py-2' ref={todoInfo} type='text' placeholder='Todo'/>
          <button className='btn' type='submit'><FiPlus /></button>
        </span>
      </form>
    </div>
  )
}
