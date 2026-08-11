import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DndContext } from "@dnd-kit/core";
import Column from "@/components/Column";
import type { Column as ColumnType, Card } from "@/types";

const mockColumn: ColumnType = {
  id: "col-1",
  title: "Backlog",
  cardIds: ["card-1"],
};
const mockCards: Card[] = [
  { id: "card-1", title: "Sample card", details: "Details here" },
];

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <DndContext>{children}</DndContext>
);

const defaultProps = {
  column: mockColumn,
  cards: mockCards,
  isOver: false,
  onRename: () => {},
  onAddCard: () => {},
  onDeleteCard: () => {},
  onCardClick: () => {},
};

describe("Column", () => {
  it("renders the column title and card count", () => {
    render(<Column {...defaultProps} />, { wrapper: Wrapper });
    expect(screen.getByText("Backlog")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders cards", () => {
    render(<Column {...defaultProps} />, { wrapper: Wrapper });
    expect(screen.getByText("Sample card")).toBeInTheDocument();
  });

  it("shows rename input when title is clicked", () => {
    render(<Column {...defaultProps} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Backlog"));
    expect(screen.getByDisplayValue("Backlog")).toBeInTheDocument();
  });

  it("calls onRename when Enter is pressed with a new title", () => {
    const onRename = vi.fn();
    render(<Column {...defaultProps} onRename={onRename} />, {
      wrapper: Wrapper,
    });
    fireEvent.click(screen.getByText("Backlog"));
    const input = screen.getByDisplayValue("Backlog");
    fireEvent.change(input, { target: { value: "Todo" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onRename).toHaveBeenCalledWith("col-1", "Todo");
  });

  it("reverts title and hides input on Escape", () => {
    render(<Column {...defaultProps} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Backlog"));
    const input = screen.getByDisplayValue("Backlog");
    fireEvent.change(input, { target: { value: "Changed" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.getByText("Backlog")).toBeInTheDocument();
  });
});
