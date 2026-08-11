"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Card } from "@/types";

interface Props {
  card: Card | null;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: Props) {
  if (!card) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-navy/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-text hover:text-dark-navy transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h2 className="text-dark-navy font-semibold text-lg pr-8 leading-snug">
          {card.title}
        </h2>
        {card.details ? (
          <p className="text-gray-text text-sm mt-3 leading-relaxed whitespace-pre-wrap">
            {card.details}
          </p>
        ) : (
          <p className="text-gray-300 text-sm mt-3 italic">
            No details provided.
          </p>
        )}
      </div>
    </div>
  );
}
