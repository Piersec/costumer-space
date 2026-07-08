"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import UserDetailsModal from "./UserDetailsModal";

interface Props {
  user: any;
}

export default function UserDetailsButton({
  user,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Ver
      </Button>

      <UserDetailsModal
        user={user}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}