"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  rectIntersection,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";
import Card from "./Card";
import CardModal from "./CardModal";
import { useBoard } from "@/hooks/useBoard";
import type { Card as CardType } from "@/types";

export default function Board() {
  const { state, renameColumn, addCard, deleteCard, moveCard } = useBoard();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [modalCard, setModalCard] = useState<CardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  }, []);

  const handleDragOver = useCallback(({ over }: DragOverEvent) => {
    setOverId((over?.id as string) ?? null);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveId(null);
      setOverId(null);
      if (!over) return;

      const activeCardId = active.id as string;
      const targetId = over.id as string;
      if (activeCardId === targetId) return;

      const sourceCol = state.columns.find((c) =>
        c.cardIds.includes(activeCardId),
      );
      if (!sourceCol) return;

      const isColumnTarget = state.columns.some((c) => c.id === targetId);
      const destCol = isColumnTarget
        ? state.columns.find((c) => c.id === targetId)!
        : state.columns.find((c) => c.cardIds.includes(targetId));
      if (!destCol) return;

      const destIndex = isColumnTarget
        ? destCol.cardIds.length
        : destCol.cardIds.indexOf(targetId);

      moveCard(activeCardId, sourceCol.id, destCol.id, destIndex);
    },
    [state.columns, moveCard],
  );

  const activeCard = activeId ? state.cards[activeId] : null;
  const activeCardColId = activeId
    ? (state.columns.find((c) => c.cardIds.includes(activeId))?.id ?? "")
    : "";

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-5 h-full px-6 py-5 overflow-x-auto">
          {state.columns.map((col) => {
            const colIsOver =
              overId === col.id || col.cardIds.includes(overId ?? "");
            return (
              <Column
                key={col.id}
                column={col}
                cards={col.cardIds.map((id) => state.cards[id]).filter(Boolean)}
                isOver={!!activeId && colIsOver}
                onRename={renameColumn}
                onAddCard={addCard}
                onDeleteCard={deleteCard}
                onCardClick={setModalCard}
              />
            );
          })}
        </div>

        <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
          {activeCard && (
            <div className="rotate-2 scale-105 shadow-2xl opacity-95">
              <Card
                card={activeCard}
                columnId={activeCardColId}
                onDelete={() => {}}
                onClick={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <CardModal card={modalCard} onClose={() => setModalCard(null)} />
    </>
  );
}
