import { useReducer, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { BoardState, Card } from "@/types";
import { initialBoardState } from "@/lib/dummy-data";

type Action =
  | { type: "RENAME_COLUMN"; columnId: string; title: string }
  | { type: "ADD_CARD"; columnId: string; card: Card }
  | { type: "DELETE_CARD"; cardId: string; columnId: string }
  | {
      type: "MOVE_CARD";
      cardId: string;
      sourceColId: string;
      destColId: string;
      destIndex: number;
    };

function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case "RENAME_COLUMN":
      return {
        ...state,
        columns: state.columns.map((c) =>
          c.id === action.columnId ? { ...c, title: action.title } : c,
        ),
      };

    case "ADD_CARD":
      return {
        ...state,
        columns: state.columns.map((c) =>
          c.id === action.columnId
            ? { ...c, cardIds: [...c.cardIds, action.card.id] }
            : c,
        ),
        cards: { ...state.cards, [action.card.id]: action.card },
      };

    case "DELETE_CARD": {
      const remainingCards = { ...state.cards };
      delete remainingCards[action.cardId];
      return {
        ...state,
        columns: state.columns.map((c) =>
          c.id === action.columnId
            ? { ...c, cardIds: c.cardIds.filter((id) => id !== action.cardId) }
            : c,
        ),
        cards: remainingCards,
      };
    }

    case "MOVE_CARD": {
      const { cardId, sourceColId, destColId, destIndex } = action;
      if (sourceColId === destColId) {
        const col = state.columns.find((c) => c.id === sourceColId)!;
        const oldIndex = col.cardIds.indexOf(cardId);
        const newCardIds = arrayMove(col.cardIds, oldIndex, destIndex);
        return {
          ...state,
          columns: state.columns.map((c) =>
            c.id === sourceColId ? { ...c, cardIds: newCardIds } : c,
          ),
        };
      }
      return {
        ...state,
        columns: state.columns.map((c) => {
          if (c.id === sourceColId)
            return { ...c, cardIds: c.cardIds.filter((id) => id !== cardId) };
          if (c.id === destColId) {
            const ids = [...c.cardIds];
            ids.splice(destIndex, 0, cardId);
            return { ...c, cardIds: ids };
          }
          return c;
        }),
      };
    }
  }
}

export function useBoard() {
  const [state, dispatch] = useReducer(reducer, initialBoardState);

  const renameColumn = useCallback((columnId: string, title: string) => {
    dispatch({ type: "RENAME_COLUMN", columnId, title });
  }, []);

  const addCard = useCallback(
    (columnId: string, title: string, details: string) => {
      const card: Card = { id: `card-${Date.now()}`, title, details };
      dispatch({ type: "ADD_CARD", columnId, card });
    },
    [],
  );

  const deleteCard = useCallback((cardId: string, columnId: string) => {
    dispatch({ type: "DELETE_CARD", cardId, columnId });
  }, []);

  const moveCard = useCallback(
    (
      cardId: string,
      sourceColId: string,
      destColId: string,
      destIndex: number,
    ) => {
      dispatch({
        type: "MOVE_CARD",
        cardId,
        sourceColId,
        destColId,
        destIndex,
      });
    },
    [],
  );

  return { state, renameColumn, addCard, deleteCard, moveCard };
}
