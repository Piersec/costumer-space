"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";

export default function CompleteProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/admin/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name,
        lastname,
        phone,
        company: "PierSec",
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/waiting-approval");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-xl border p-8">
        <h1 className="mb-2 text-2xl font-bold">
          Complete seu cadastro
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          Precisamos de algumas informações antes de liberar seu acesso.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input required
            className="w-full rounded border p-3"
            placeholder="Nome"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input required
            className="w-full rounded border p-3"
            placeholder="Sobrenome"
            value={lastname}
            onChange={(e) =>
              setLastname(e.target.value)
            }
          />

          <input required
            className="w-full rounded border p-3"
            placeholder="Telefone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <button
            disabled={loading}
            className="w-full rounded bg-primary p-3 text-white"
          >
            {loading
              ? "Salvando..."
              : "Concluir Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}