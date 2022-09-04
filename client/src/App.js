import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from './components/todoList';
 
const App = () => {
 return (
   <div>
     <Routes>
       <Route exact path='/' element={<TodoList />} />
     </Routes>
   </div>
 );
};
 
export default App;