"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  name?: string;
  size?: number;
}

export default function ProfileAvatar({
  avatarUrl,
  name,
  size = 48,
}: ProfileAvatarProps) {
  return (
    <div
      className="relative overflow-hidden rounded-full bg-zinc-200 flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name ?? "Perfil"}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <User
          size={size * 0.55}
          className="text-zinc-500"
          strokeWidth={2}
        />
      )}
    </div>
  );
}