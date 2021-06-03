import { useState, useReducer } from 'react';

import './App.css';

function reducer(state, action) {
  switch (action.type) {
    case 'todo-add':
      return {
        todos: [
          ...state.todos,
          { id: new Date().getTime(), text: action.payload, completed: false },
        ],
        todoCount: state.todos.length + 1,
      };
    case 'toggle-todo':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        todoCount: state.todos.length,
      };
    case 'reset':
      return {
        todos: [],
        todoCount: 0,
      };
    case 'delete-completed':
      return {
        todos:
          state.todos.length ===
          state.todos.filter((todo) => todo.completed !== true).length
            ? state.todos
            : state.todos.filter((todo) => todo.completed !== true),
        todoCount:
          state.todos.length ===
          state.todos.filter((todo) => todo.completed !== true).length
            ? state.todos.length
            : state.todos.filter((todo) => todo.completed !== true).length,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { todos: [], todoCount: 0 });
  const [text, setText] = useState('');
  return (
    <div className="App">
      <h1>Todo App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'todo-add', payload: text });
          setText('');
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        <button onClick={() => dispatch({ type: 'delete-completed' })}>
          Delete Completed
        </button>
      </div>
      <h2>Total no of todos: {state.todoCount}</h2>
      <pre>{JSON.stringify(state.todos, null, 1)}</pre>
      <ul>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: 'toggle-todo', payload: todo.id })}
            style={{
              textDecoration: todo.completed ? 'line-through' : '',
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
