import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "@/components/Card";
import type { Card as CardType } from "@/types";

const mockCard: CardType = {
  id: "test-1",
  title: "Test Card",
  details: "These are the details",
};

describe("Card", () => {
  it("renders title and details", () => {
    render(
      <Card
        card={mockCard}
        columnId="col-1"
        onDelete={() => {}}
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("These are the details")).toBeInTheDocument();
  });

  it("calls onClick with the card when clicked", () => {
    const onClick = vi.fn();
    render(
      <Card
        card={mockCard}
        columnId="col-1"
        onDelete={() => {}}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByText("Test Card"));
    expect(onClick).toHaveBeenCalledWith(mockCard);
  });

  it("calls onDelete with cardId and columnId when delete button clicked", () => {
    const onDelete = vi.fn();
    render(
      <Card
        card={mockCard}
        columnId="col-1"
        onDelete={onDelete}
        onClick={() => {}}
      />,
    );
    fireEvent.click(screen.getByLabelText("Delete card"));
    expect(onDelete).toHaveBeenCalledWith("test-1", "col-1");
  });

  it("delete button click does not call onClick", () => {
    const onClick = vi.fn();
    render(
      <Card
        card={mockCard}
        columnId="col-1"
        onDelete={() => {}}
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByLabelText("Delete card"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
