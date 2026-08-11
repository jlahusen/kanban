"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import type { Card as CardType } from "@/types";

interface Props {
  card: CardType;
  columnId: string;
  onDelete: (cardId: string, columnId: string) => void;
  onClick: (card: CardType) => void;
  isDragging?: boolean;
}

export default function Card({
  card,
  columnId,
  onDelete,
  onClick,
  isDragging,
}: Props) {
  return (
    <div
      data-testid="card"
      className={`bg-white rounded-lg p-3 shadow-sm select-none transition-all ${
        isDragging
          ? "opacity-40"
          : "cursor-grab hover:shadow-md hover:-translate-y-0.5"
      }`}
      onClick={() => onClick(card)}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-dark-navy font-medium text-sm leading-snug flex-1">
          {card.title}
        </p>
        <button
          className="flex-shrink-0 text-gray-300 hover:text-red-400 transition-colors mt-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id, columnId);
          }}
          aria-label="Delete card"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      {card.details && (
        <p className="text-gray-text text-xs mt-1.5 line-clamp-2 leading-relaxed">
          {card.details}
        </p>
      )}
    </div>
  );
}
