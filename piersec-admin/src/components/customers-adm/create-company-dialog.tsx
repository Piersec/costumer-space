"use client";

import { useState } from "react";
import { createCompany } from "@/app/actions/customers";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreateCompanyDialog() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    try {
      setLoading(true);

      await createCompany({
        name,
        domain,
      });

      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Empresa
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar empresa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            placeholder="Nome da empresa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Domínio"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Criando..." : "Salvar empresa"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}