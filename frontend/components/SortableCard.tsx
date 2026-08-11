"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import type { Card as CardType } from "@/types";

interface Props {
  card: CardType;
  columnId: string;
  onDelete: (cardId: string, columnId: string) => void;
  onClick: (card: CardType) => void;
}

export default function SortableCard({
  card,
  columnId,
  onDelete,
  onClick,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Card
        card={card}
        columnId={columnId}
        onDelete={onDelete}
        onClick={onClick}
        isDragging={isDragging}
      />
    </div>
  );
}
