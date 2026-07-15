"use client";

import { Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Login from "@/components/loginForm";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const bgSrc = mounted && resolvedTheme === "dark" ? "/bg/blackbg.png" : "/bg/whitebg.png";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {mounted && (
        <img
          src={bgSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}

      <Suspense fallback={<div>Carregando...</div>}>
        <div className="w-full max-w-md">
          <Login />
        </div>
      </Suspense>
    </main>
  );
}