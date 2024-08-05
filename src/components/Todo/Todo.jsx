import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Todo.module.css';

export default function Todo({ todo, onUpdate, onDelete }) {
  const { text, status, id } = todo;
  const onHandleChange = (e) => {
    const status = e.target.checked ? 'completed' : 'active';
    onUpdate({ ...todo, status });
  };

  const onHandleDelete = () => {
    onDelete(todo);
  };

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={status === 'completed'}
        onChange={onHandleChange}
      />
      <label className={styles.text} htmlFor={id}>
        {text}
      </label>
      <span className={styles.icon}>
        <button className={styles.button} onClick={onHandleDelete}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
