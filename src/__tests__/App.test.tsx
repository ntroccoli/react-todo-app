import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

// Simple smoke test for add and clear flows using the real hook with localStorage

describe("App", () => {
  it("shows empty state, can add a todo, toggle and clear all", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText(/no to-dos yet/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/new to-do/i), "Walk dog{enter}");

    expect(screen.getByText("Walk dog")).toBeInTheDocument();
    expect(screen.getByText(/1 active/i)).toBeInTheDocument();

    // toggle complete
    const checkbox = screen.getByRole("checkbox", {
      name: /mark as complete/i,
    });
    await user.click(checkbox);

    expect(screen.getByText(/1 completed/i)).toBeInTheDocument();

    // clear all
    await user.click(screen.getByRole("button", { name: /clear all/i }));
    expect(screen.getByText(/no to-dos yet/i)).toBeInTheDocument();
  });
});
