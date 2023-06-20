"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      if (editMode) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditValue("");
        setEditMode(false);
      } else {
        setTodos([...todos, newTodo]);
      }
      setNewTodo("");
    }
  };

  const handleTodoComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = `✅ ${updatedTodos[index]}`;
    setTodos(updatedTodos);
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleTodoEdit = (index, value) => {
    setEditMode(true);
    setEditIndex(index);
    setEditValue(value);
    setNewTodo(value);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditIndex(null);
    setEditValue("");
    setNewTodo("");
  };

  return (
    <div className={styles.container}>
      <h1>Todo App</h1>

      <form onSubmit={handleFormSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button type="submit">{editMode ? "Update Todo" : "Add Todo"}</button>
        {editMode && (
          <button type="button" onClick={cancelEditMode}>
            Cancel
          </button>
        )}
      </form>

      <ul className={styles.todos}>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo}</span>
            {!editMode && (
              <div>
                <button onClick={() => handleTodoComplete(index)}>
                  Complete
                </button>
                <button onClick={() => handleTodoEdit(index, todo)}>
                  Edit
                </button>
                <button onClick={() => handleTodoDelete(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
