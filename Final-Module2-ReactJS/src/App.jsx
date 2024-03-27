import React, { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = "task-list";
export default function App() {
  const [todos, setTodos] = useState(()=> {
    const storedList = localStorage.getItem(LOCAL_STORAGE_KEY)
    return storedList ? JSON.parse(storedList) : []
  });
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  const handleChange = (e) => {
    setInputValue(e.target.value) 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue])
      setInputValue('')
    }
  }

  const handleDelete = (index) => {
    const newTodos = [...todos]
    newTodos.splice(index,1)
    setTodos(newTodos)
  }

  const handleEdit = (index) => {
    setEditIndex(index)
    setInputValue(todos[index])
  }

  const handleUpdate = (index) => {
    const newTodos = [...todos]
    newTodos[index] = inputValue
    setTodos(newTodos)
    setInputValue('')
    setEditIndex(null)
  }

  return (
    <div className="todolist-container">
      <div className="todo-app">
        <h2>Todo list</h2>
        <p>Get things done, one item at a time</p>
        <ul className="list-container">
        {
          todos.map((todo,index) => {
            return <li key={index}>
              {index === editIndex ? (
              <>
              <input type="text" 
              value={inputValue}
              onChange={handleChange}
              />
              <button onClick={()=> handleUpdate(index)}>Update</button>
              </>
              ):(
              <>
              {todo}
              <button onClick={()=>handleDelete(index)} className="button">Delete</button>
              <button onClick={()=>handleEdit(index)} className="button">Edit</button>
              </>
              )}
            </li>
            }
          )}
        </ul>
        <h2>Add to the todo list</h2>
        <div className="row">
          
          <input type="text" 
          onChange={handleChange}
          value={inputValue}
          id="input-box"
          placeholder='Add things todo'
          />
          <button onClick={()=>handleSubmit(event)}>ADD ITEM</button>
        </div>
        </div>  
      </div>
  )
}
