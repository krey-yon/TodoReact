import './App.css'
import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import Form from './components/Form';
import TodoItem from './components/TodoItem';


function App() {

  const [todos, setTodos] = useState([]);

  //creating functions to add, delete, toggle and update todos
  const addTodo = (todo) => {
      setTodos((prev) => [{id: Date.now(), ...todo},...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))); //if id matches then update the todo if not then return the previous todo
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    // Filters out the todo with the matching id.
    // If the id matches, it will be excluded from the new array.
    // Using !== ensures that only the todo with the given id is removed.
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    // Maps over the todos array.
    // If the id matches, it toggles the completed property.
    // If the id does not match, it returns the todo as is.
  }

  // useEffect to fetch todos from local storage
  useEffect(() => {
    const todos = localStorage.getItem('todos');
    if(todos){
      setTodos(JSON.parse(todos));
    }
  }, []);

  // useEffect to save todos to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <TodoProvider value={{todos, addTodo, deleteTodo, toggleTodo, updateTodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */} 
              < Form />
          </div>
          <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                              <div key={todo.id}
                              className='w-full'
                              >
                                <TodoItem todo={todo} />
                              </div>
                            ))}
          </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
