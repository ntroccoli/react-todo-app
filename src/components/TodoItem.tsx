import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  const createdDate = new Date(todo.createdAt);
  const completedDate = todo.completedAt ? new Date(todo.completedAt) : null;

  return (
    <li
      className="group flex flex-wrap gap-2 items-center justify-between rounded-md border p-4"
      data-testid={`todo-item-${todo.id}`}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          className="hover:cursor-pointer"
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        />

        <div className="flex flex-col">
          <span
            className={`text-md ${
              todo.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </span>
          <span className="text-xs text-muted-foreground">
            Created {createdDate.toLocaleString()}
            {todo.completed && completedDate
              ? ` • Completed ${completedDate.toLocaleString()}`
              : ""}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        className="hover:cursor-pointer hover:text-destructive"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        Delete
      </Button>
    </li>
  );
}
