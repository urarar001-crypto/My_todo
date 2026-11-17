import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../../../shared/lib/storage';
import type { Todo, TodoFilter } from './types';

const STORAGE_KEY = 'my_todo_items_v1';

/**
 * 고유한 할 일 ID를 생성합니다.
 */
function createTodoId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * LocalStorage와 동기화되는 할 일 목록 상태 관리 훅입니다.
 */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadFromStorage<Todo[]>(STORAGE_KEY, []));
  const [filter, setFilter] = useState<TodoFilter>('all');

  // 할 일 목록이 변경될 때마다 LocalStorage에 자동 저장합니다.
  useEffect(() => {
    saveToStorage(STORAGE_KEY, todos);
  }, [todos]);

  // 새 할 일 추가
  const addTodo = useCallback((rawTitle: string) => {
    const title = rawTitle.trim();
    if (!title) {
      return;
    }

    const newTodo: Todo = {
      id: createTodoId(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  // 할 일 완료 상태 토글
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }, []);

  // 특정 할 일 삭제
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // 완료된 할 일 일괄 삭제
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  // 현재 필터에 맞는 할 일 목록 계산
  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, filter]);

  // 요약 통계 계산
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [todos]);

  return {
    todos,
    filteredTodos,
    filter,
    stats,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
