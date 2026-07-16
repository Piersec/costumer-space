"use client";

import { Wrench } from "lucide-react";
import { useState } from "react";


export default function ComingSoon() {
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  

  return (
    <main
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white cursor-none"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-100"
        style={{
          background: `radial-gradient(
            350px circle at ${mouse.x}px ${mouse.y}px,
            rgba(255,255,255,.08),
            transparent 70%
          )`,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-2xl px-6 text-center animate-[fadeIn_.8s_ease]">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur">
          <Wrench className="h-8 w-8" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Página em
          <br />
          desenvolvimento
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-zinc-400">
          Estamos trabalhando para entregar uma experiência melhor.
          Volte em breve para conferir as novidades.
        </p>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <p className="mt-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} PierSec
        </p>
      </div>
    </main>
  );
}