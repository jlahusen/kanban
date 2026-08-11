"use client";

import { useState, useRef, useEffect } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableCard from "./SortableCard";
import AddCardForm from "./AddCardForm";
import type { Column as ColumnType, Card } from "@/types";

interface Props {
  column: ColumnType;
  cards: Card[];
  isOver: boolean;
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string, columnId: string) => void;
  onCardClick: (card: Card) => void;
}

export default function Column({
  column,
  cards,
  isOver,
  onRename,
  onAddCard,
  onDeleteCard,
  onCardClick,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(column.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // useDroppable makes the card-list area a drop target (needed for empty columns)
  const { setNodeRef } = useDroppable({ id: column.id });

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commitRename = () => {
    const trimmed = titleValue.trim();
    if (trimmed) onRename(column.id, trimmed);
    else setTitleValue(column.title);
    setEditing(false);
  };

  return (
    <div
      data-testid={`column-${column.id}`}
      className="w-72 flex-shrink-0 flex flex-col rounded-xl overflow-hidden shadow-lg"
    >
      {/* Header */}
      <div className="bg-dark-navy px-4 py-3 flex items-center justify-between border-l-4 border-accent-yellow">
        {editing ? (
          <input
            ref={inputRef}
            className="bg-transparent text-white font-semibold text-sm uppercase tracking-wide outline-none border-b border-white/50 flex-1 min-w-0"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitRename();
              if (e.key === "Escape") {
                setTitleValue(column.title);
                setEditing(false);
              }
            }}
          />
        ) : (
          <button
            className="text-white font-semibold text-sm uppercase tracking-wide hover:text-accent-yellow transition-colors cursor-text text-left truncate flex-1 min-w-0"
            onClick={() => setEditing(true)}
            title="Click to rename"
          >
            {column.title}
          </button>
        )}
        <span className="ml-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full flex-shrink-0">
          {cards.length}
        </span>
      </div>

      {/* Card list */}
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[80px] overflow-y-auto p-3 flex flex-col gap-2 transition-colors ${
          isOver ? "bg-blue-primary/20" : "bg-white/5"
        }`}
      >
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              columnId={column.id}
              onDelete={onDeleteCard}
              onClick={onCardClick}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add card area */}
      <div className="px-3 pb-3 pt-2 bg-dark-navy/80">
        <AddCardForm
          onAdd={(title, details) => onAddCard(column.id, title, details)}
        />
      </div>
    </div>
  );
}
