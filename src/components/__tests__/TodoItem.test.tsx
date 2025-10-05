import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "../TodoItem";
import type { Todo } from "@/types/todo";

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: "t1",
  title: "Test Task",
  completed: false,
  createdAt: new Date("2024-01-01T00:00:00Z").toISOString(),
  completedAt: null,
  ...overrides,
});

describe("TodoItem", () => {
  it("renders title and created date", () => {
    const todo = makeTodo();
    render(
      <ul>
        <TodoItem todo={todo} onToggle={vi.fn()} onDelete={vi.fn()} />
      </ul>
    );
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /delete test task/i })
    ).toBeInTheDocument();
  });

  it("calls onToggle when checkbox clicked", async () => {
    const todo = makeTodo();
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <TodoItem todo={todo} onToggle={onToggle} onDelete={vi.fn()} />
      </ul>
    );
    const checkbox = screen.getByRole("checkbox", {
      name: /mark as complete/i,
    });
    await user.click(checkbox);
    expect(onToggle).toHaveBeenCalledWith("t1");
  });

  it("calls onDelete when delete button clicked", async () => {
    const todo = makeTodo();
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <TodoItem todo={todo} onToggle={vi.fn()} onDelete={onDelete} />
      </ul>
    );
    await user.click(screen.getByRole("button", { name: /delete test task/i }));
    expect(onDelete).toHaveBeenCalledWith("t1");
  });
});
