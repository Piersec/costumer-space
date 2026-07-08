"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { approveUser, blockUser } from "./actions";

interface UserActionsProps {
  userId: string;
  email: string;
}

export default function UserActions({
  userId,
  email,
}: UserActionsProps) {
  const [isPending, startTransition] = useTransition();

  function handleApprove() {
    startTransition(async () => {
      try {
        await approveUser(userId, email);
      } catch (err) {
        console.error(err);
      }
    });
  }

  function handleBlock() {
    startTransition(async () => {
      try {
        await blockUser(userId);
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        size="sm"
        disabled={isPending}
        onClick={handleApprove}
      >
        Aprovar
      </Button>

      <Button
        variant="destructive"
        size="sm"
        disabled={isPending}
        onClick={handleBlock}
      >
        Bloquear
      </Button>
    </div>
  );
}