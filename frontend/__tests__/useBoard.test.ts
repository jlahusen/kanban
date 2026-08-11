import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBoard } from "@/hooks/useBoard";

describe("useBoard", () => {
  it("initialises with 5 columns", () => {
    const { result } = renderHook(() => useBoard());
    expect(result.current.state.columns).toHaveLength(5);
  });

  it("renames a column", () => {
    const { result } = renderHook(() => useBoard());
    act(() => result.current.renameColumn("col-1", "Todo"));
    expect(result.current.state.columns[0].title).toBe("Todo");
  });

  it("adds a card to a column", () => {
    const { result } = renderHook(() => useBoard());
    act(() => result.current.addCard("col-1", "New task", "Details here"));
    const col = result.current.state.columns.find((c) => c.id === "col-1")!;
    const lastId = col.cardIds[col.cardIds.length - 1];
    expect(result.current.state.cards[lastId].title).toBe("New task");
  });

  it("deletes a card and removes it from the column", () => {
    const { result } = renderHook(() => useBoard());
    const col = result.current.state.columns[0];
    const cardId = col.cardIds[0];
    act(() => result.current.deleteCard(cardId, col.id));
    expect(result.current.state.columns[0].cardIds).not.toContain(cardId);
    expect(result.current.state.cards[cardId]).toBeUndefined();
  });

  it("moves a card within the same column", () => {
    const { result } = renderHook(() => useBoard());
    const col = result.current.state.columns[0];
    const [first] = col.cardIds;
    act(() => result.current.moveCard(first, col.id, col.id, 2));
    expect(result.current.state.columns[0].cardIds[2]).toBe(first);
  });

  it("moves a card to a different column", () => {
    const { result } = renderHook(() => useBoard());
    const sourceCol = result.current.state.columns[0];
    const destCol = result.current.state.columns[1];
    const cardId = sourceCol.cardIds[0];
    act(() => result.current.moveCard(cardId, sourceCol.id, destCol.id, 0));
    expect(result.current.state.columns[0].cardIds).not.toContain(cardId);
    expect(result.current.state.columns[1].cardIds[0]).toBe(cardId);
  });
});
