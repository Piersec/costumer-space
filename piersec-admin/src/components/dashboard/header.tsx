"use client";

import ColorMode from "../ui/ColorMode";

import { getProfile } from "@/app/actions/profile";

import { useState, useEffect } from "react";

import ProfileAvatar from "./ProfileAvatar";
import ProfileModal from "./ProfileModal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const profile = await getProfile();

      if (profile) {
        setAvatarUrl(profile.avatar_url);
      }
    }

    loadProfile();
  }, []);

  return (
    <>
      <header className="flex h-16 items-center justify-between rounded-full border px-3">
        <nav>
          <ul className="flex gap-4">
            <li className="rounded-full bg-black px-8 py-2">
              <a href="/admin/dashboard" className="text-lg  text-white">
                Dashboard
              </a>
            </li>

            <li className="rounded-full bg-black px-8 py-2">
              <a
                href="/admin/dashboard/costumer-area"
                className="text-lg text-white"
              >
                Área do Cliente
              </a>
            </li>

            <li className="rounded-full bg-black px-8 py-2">
              <a href="/dashboard" className="text-lg text-white">
                Usuários
              </a>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="rounded-full transition hover:scale-105"
        >
          <ProfileAvatar avatarUrl={avatarUrl} />
        </button>

        <ProfileModal
          open={open}
          onClose={() => setOpen(false)}
          onAvatarChange={setAvatarUrl}
        />
      </header>
    </>
  );
}
