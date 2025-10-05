import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddTodoForm } from "../AddTodoForm";

describe("AddTodoForm", () => {
  it("disables submit when input is empty and enables when text entered", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByLabelText(/new to-do/i);
    const button = screen.getByRole("button", { name: /add to-do/i });

    expect(button).toBeDisabled();

    await user.type(input, "Buy milk");
    expect(button).toBeEnabled();
  });

  it("calls onAdd with the entered value and clears input", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddTodoForm onAdd={onAdd} />);

    const input = screen.getByLabelText(/new to-do/i);

    await user.type(input, "Buy bread{enter}");

    expect(onAdd).toHaveBeenCalledWith("Buy bread");
    expect((input as HTMLInputElement).value).toBe("");
  });
});
