"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  onAdd: (title: string, details: string) => void;
}

export default function AddCardForm({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const reset = () => {
    setTitle("");
    setDetails("");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), details.trim());
    reset();
  };

  if (!open) {
    return (
      <button
        className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm px-2 py-1.5 rounded-lg hover:bg-white/10 transition-all w-full"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="w-4 h-4" />
        Add card
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        autoFocus
        className="w-full text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-lg px-3 py-2 outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full text-sm bg-white/10 text-white placeholder-white/40 border border-white/20 rounded-lg px-3 py-2 outline-none focus:border-blue-primary focus:ring-1 focus:ring-blue-primary resize-none"
        placeholder="Details (optional)"
        rows={2}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-purple-secondary text-white text-sm font-medium rounded-lg px-3 py-1.5 hover:opacity-90 transition-opacity"
        >
          Add
        </button>
        <button
          type="button"
          className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
          onClick={reset}
          aria-label="Cancel"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
