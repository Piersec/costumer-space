"use client";

import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faLock,
  faUnlock,
  faShield,
  faTrash,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProfileAvatar from "@/components/dashboard/ProfileAvatar";
import { Badge } from "@/components/ui/badge";

interface Props {
  user: any;
  open: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({
  user,
  open,
  onClose,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-2xl">
  <DialogHeader>
    <DialogTitle>
      Usuário
    </DialogTitle>
  </DialogHeader>

  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <ProfileAvatar
        avatarUrl={user.avatar_url}
        name={`${user.name ?? ""} ${user.lastname ?? ""}`}
        size={70}
      />

      <div>
        <h2 className="text-xl font-semibold">
          {user.name} {user.lastname}
        </h2>

        <p className="text-muted-foreground">
          {user.email}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <Info
        label="Empresa"
        value={user.company}
      />

      <Info
        label="Telefone"
        value={user.phone}
      />

      <Info
        label="Criado em"
        value={new Date(
          user.created_at
        ).toLocaleDateString("pt-BR")}
      />

      <div>
        <p className="text-sm text-muted-foreground">
          Status
        </p>

        <Badge>
          {user.status}
        </Badge>
      </div>
    </div>

    <div className="border-t pt-6">
      <h3 className="mb-4 text-lg font-semibold">
        Administração
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="justify-start"
        >
          <FontAwesomeIcon
            icon={faPen}
            className="mr-2"
          />
          Editar usuário
        </Button>

        {user.status !== "blocked" ? (
          <Button
            variant="outline"
            className="justify-start"
          >
            <FontAwesomeIcon
              icon={faLock}
              className="mr-2"
            />
            Bloquear usuário
          </Button>
        ) : (
          <Button
            variant="outline"
            className="justify-start"
          >
            <FontAwesomeIcon
              icon={faUnlock}
              className="mr-2"
            />
            Desbloquear usuário
          </Button>
        )}

        <Button
          variant="outline"
          className="justify-start"
        >
          <FontAwesomeIcon
            icon={faShield}
            className="mr-2"
          />
          Tornar Super Admin
        </Button>

        <Button
          variant="outline"
          className="justify-start"
        >
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className="mr-2"
          />
          Histórico de Auditoria
        </Button>

        <Button
          variant="destructive"
          className="col-span-2 justify-start border border-red-300"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="mr-2"
          />
          Excluir usuário
        </Button>
      </div>
    </div>
  </div>
</DialogContent>
    </Dialog>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}