"use client";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/Board"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-dark-navy">
      <header className="flex-shrink-0 h-14 flex items-center px-6 border-b border-white/10 bg-dark-navy">
        <h1 className="text-white font-bold text-xl tracking-tight">
          <span className="text-accent-yellow">K</span>anban
        </h1>
      </header>
      <main className="flex-1 overflow-hidden">
        <Board />
      </main>
    </div>
  );
}
