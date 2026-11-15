// src/types/todo.ts

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
}

export interface TodoCreate {
    title: string;
}