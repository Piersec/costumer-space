// app/unauthorized/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setEmail(data?.user?.email ?? null);
    }
    loadUser();
  }, []);

  async function handleLogout() {
    setLoadingLogout(true);
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-[400px] p-8 rounded-lg border border-border text-center items-center">
        <ShieldAlert className="w-10 h-10 text-destructive" />

        <h1 className="font-bold text-lg">Acesso não autorizado</h1>

        <p className="text-muted-foreground text-sm">
          {email ? (
            <>
              A conta <span className="font-medium">{email}</span> não tem
              permissão para acessar a área administrativa.
            </>
          ) : (
            "Você não tem permissão para acessar esta área."
          )}
        </p>

        <p className="text-muted-foreground text-xs">
          Apenas contas com domínio{" "}
          <span className="font-medium">@piersec.com.br</span> podem acessar
          o painel admin.
        </p>

        <Button
          onClick={handleLogout}
          disabled={loadingLogout}
          className="w-full"
        >
          {loadingLogout ? "Saindo..." : "Sair e voltar ao login"}
        </Button>
      </div>
    </div>
  );
}