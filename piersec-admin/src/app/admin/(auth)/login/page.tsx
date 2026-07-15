"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Login from "@/components/loginFormADM";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const bgSrc = mounted && resolvedTheme === "dark" ? "/bg/blackbg.png" : "/bg/bgwhite.png";

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-8">
      {mounted && (
        <img
          src={bgSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}

      <Login />
    </main>
  );
}