import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './TodoForm.module.css';

// Описываем, какие функции компонент ждет от родителя
interface TodoFormProps {
  onAdd: (title: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd(title); // Передаем текст наверх
    setTitle(''); // Очищаем локальный инпут
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Что нужно сделать?"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Добавить</button>
    </form>
  );
}