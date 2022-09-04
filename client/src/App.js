import './App.css';
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import TodoList from "./components/todoList";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<TodoList />} />
     </Routes>
   </div>
 );
};
 
export default App;