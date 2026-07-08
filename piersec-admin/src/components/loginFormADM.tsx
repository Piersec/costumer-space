"use client";

import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSSO, setLoadingSSO] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Login via e-mail e senha
  async function loginWithPassword() {
    setLoadingPassword(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoadingPassword(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  // Login via SSO Microsoft
  async function loginWithMicrosoft() {
    setLoadingSSO(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        // pra onde o usuário volta depois do callback processar a sessão
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard`,
        scopes: "email openid profile",
      },
    });

    if (error) {
      setLoadingSSO(false);
      alert(error.message);
    }
    // se não der erro, o navegador já foi redirecionado pra Microsoft,
    // então não precisa fazer mais nada aqui
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <div className=" flex flex-col gap-4 w-[400px] p-8 rounded-lg border border-border">

          <h1>
            Bem-vindo ao <span className="font-bold">Piersec Admin!</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Por favor, faça login para continuar.
          </p>

          <Button
            onClick={loginWithMicrosoft}
            disabled={loadingSSO}
            className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <FontAwesomeIcon icon={faMicrosoft} />
            {loadingSSO ? "Redirecionando..." : "Login via SSO"}
          </Button>

        </div>
      </div>
    </div>
  );
}