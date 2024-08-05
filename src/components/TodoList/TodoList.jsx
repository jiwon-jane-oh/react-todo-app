import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
  // const [todos, setTodos] = useState([
  //   { id: '123', text: '장보기', status: 'active' },
  //   { id: '1234', text: '공부하기', status: 'active' },
  // ]);
  // 함수 자체를 전달하는 대신에 콜백함수를 전달하면 원래 가지고있던 초기값을 그대로 사용하고  쓸대없이  함수는다시 재호출 하지않으므로 더 효율적!
  // const [todos, setTodos] = useState(readTodosFromLocalStorage());
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));

  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === 'all') return todos;

  return todos.filter((todo) => todo.status === filter);
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
