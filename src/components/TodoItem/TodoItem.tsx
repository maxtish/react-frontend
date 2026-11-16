import type { Todo } from '../../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={styles.item}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
        className={styles.checkbox}
      />
      <span className={todo.completed ? styles.textCompleted : styles.text}>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)} className={styles.deleteBtn}>
        Удалить
      </button>
    </li>
  );
}