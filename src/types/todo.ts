export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO string
  completedAt?: string | null; // ISO string or null
}
