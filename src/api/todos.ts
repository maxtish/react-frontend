// src/api/todos.ts

import type { Todo, TodoCreate } from '../types/todo';


const BASE_URL = '/api/todos';

export const todosApi = {
    // Получить все задачи
    async getAll(): Promise<Todo[]> {
        const response = await fetch(`${BASE_URL}/`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        return response.json();
    },

    // Создать задачу
    async create(data: TodoCreate): Promise<Todo> {
        const response = await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    // Переключить статус
    async toggle(id: number): Promise<Todo> {
        const response = await fetch(`${BASE_URL}/${id}/toggle`, {
            method: 'PATCH',
        });
        return response.json();
    },

    // Удалить задачу
    async delete(id: number): Promise<void> {
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
    }
};