import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddCardForm from "@/components/AddCardForm";

describe("AddCardForm", () => {
  it("shows the Add card button initially", () => {
    render(<AddCardForm onAdd={() => {}} />);
    expect(screen.getByText("Add card")).toBeInTheDocument();
  });

  it("expands the form when the button is clicked", async () => {
    render(<AddCardForm onAdd={() => {}} />);
    await userEvent.click(screen.getByText("Add card"));
    expect(screen.getByPlaceholderText("Card title")).toBeInTheDocument();
  });

  it("calls onAdd with trimmed title and details on submit", async () => {
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} />);
    await userEvent.click(screen.getByText("Add card"));
    await userEvent.type(
      screen.getByPlaceholderText("Card title"),
      " My new card ",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Details (optional)"),
      "Some details",
    );
    await userEvent.click(screen.getByText("Add"));
    expect(onAdd).toHaveBeenCalledWith("My new card", "Some details");
  });

  it("does not call onAdd when title is blank", async () => {
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} />);
    await userEvent.click(screen.getByText("Add card"));
    await userEvent.click(screen.getByText("Add"));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("collapses back to button after successful submit", async () => {
    render(<AddCardForm onAdd={() => {}} />);
    await userEvent.click(screen.getByText("Add card"));
    await userEvent.type(screen.getByPlaceholderText("Card title"), "Done");
    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Add card")).toBeInTheDocument();
  });
});
