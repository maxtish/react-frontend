// src/App.tsx
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { todosApi } from './api/todos';
import type { Todo } from './types/todo';


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // Загружаем задачи при старте приложения
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await todosApi.create({ title: newTodoTitle });
      // Добавляем новую задачу в начало списка
      setTodos([newTodo, ...todos]);
      setNewTodoTitle(''); // Очищаем поле ввода
    } catch (error) {
      console.error('Ошибка при создании:', error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const updatedTodo = await todosApi.toggle(id);
      // Обновляем статус конкретной задачи в массиве
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todosApi.delete(id);
      // Убираем задачу из интерфейса
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Загрузка...</div>;

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>Список задач</h1>
      
      {/* Форма добавления */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Что нужно сделать?"
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Добавить</button>
      </form>

      {/* Список задач */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '10px',
              borderBottom: '1px solid #ccc'
            }}
          >
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggle(todo.id)} 
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ 
              flexGrow: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#000'
            }}>
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={{ color: 'red', cursor: 'pointer' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p style={{ color: '#888' }}>Список пуст. Добавьте первую задачу!</p>}
    </div>
  );
}

export default App;