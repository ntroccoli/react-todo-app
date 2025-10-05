import { useCallback, useEffect, useMemo, useState } from "react";
import type { Todo } from "../types/todo";

const STORAGE_KEY = "todos:v1";

function safeParse(value: string | null): Todo[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (t) => typeof t?.id === "string" && typeof t?.title === "string"
      );
    }
    return [];
  } catch {
    return [];
  }
}

function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.completed && !b.completed) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    const aCompleted = a.completedAt ?? a.createdAt;
    const bCompleted = b.completedAt ?? b.createdAt;
    return new Date(bCompleted).getTime() - new Date(aCompleted).getTime();
  });
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() =>
    sortTodos(safeParse(localStorage.getItem(STORAGE_KEY)))
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const now = new Date().toISOString();
    setTodos((prev) =>
      sortTodos([
        ...prev,
        {
          id: crypto.randomUUID(),
          title: trimmed,
          completed: false,
          createdAt: now,
          completedAt: null,
        },
      ])
    );
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      sortTodos(
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                completed: !t.completed,
                completedAt: !t.completed ? new Date().toISOString() : null,
              }
            : t
        )
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => sortTodos(prev.filter((t) => t.id !== id)));
  }, []);

  const clearAll = useCallback(() => {
    setTodos([]);
  }, []);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  return { todos, addTodo, toggleTodo, deleteTodo, clearAll, stats };
}
