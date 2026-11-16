import { useEffect, useState } from 'react';
import { todosApi } from '../../api/todos';
import { TodoForm } from '../../components/TodoForm/TodoForm';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import type { Todo } from '../../types/todo';
import styles from './TodosPage.module.css';


export function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await todosApi.create({ title });
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error('Ошибка создания:', error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const updatedTodo = await todosApi.toggle(id);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todosApi.delete(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  if (loading) return <div className={styles.emptyState}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Мои задачи</h1>
      
      {/* Передаем функцию handleAdd в форму */}
      <TodoForm onAdd={handleAdd} />

      <ul className={styles.list}>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p className={styles.emptyState}>Список пуст. Добавьте первую задачу!</p>
      )}
    </div>
  );
}