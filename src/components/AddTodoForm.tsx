import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  onAdd: (title: string) => void;
}

export function AddTodoForm({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <div className="flex-1 gap-4">
        <Label className="text-lg mb-2" htmlFor="todo-input">
          New to-do
        </Label>
        <Input
          id="todo-input"
          ref={inputRef}
          placeholder="Add a task and press Enter"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="New to-do"
        />
      </div>
      <Button type="submit" aria-label="Add to-do" disabled={!value.trim()}>
        Add
      </Button>
    </form>
  );
}
