"use client";

import BotaoComTooltip from "./ui/Tooltip/TooltipHelp";

import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEFAULT_REDIRECT = "/costumer";

export default function LoginPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSSO, setLoadingSSO] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // "next" vem do middleware quando o usuário tentava acessar
  // uma URL protegida sem estar logado; senão, cai no default
  const next = searchParams.get("next") ?? DEFAULT_REDIRECT;

  // Mensagens de erro vindas do /auth/callback
  const errorParam = searchParams.get("error");
  const errorMessage = errorParam
    ? errorParam === "auth_failed"
      ? "Não foi possível concluir o login. Tente novamente."
      : "Login cancelado ou não autorizado."
    : null;

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

    window.location.href = next;
  }

  // Login via SSO Microsoft
  async function loginWithMicrosoft() {
    setLoadingSSO(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        // pra onde o usuário volta depois do callback processar a sessão
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
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
        <div className=" flex flex-col w-[400px] p-8 rounded-lg border border-border">
          <h1>
            Bem-vindo à <span className="font-bold">Área do Cliente!</span>
          </h1>
          <p className="text-muted-foreground mb-10  text-sm">
            Por favor, faça login para continuar.
          </p>

          {errorMessage && (
            <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          <Button
            onClick={loginWithMicrosoft}
            disabled={loadingSSO}
            className="flex items-center mb-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <FontAwesomeIcon icon={faMicrosoft} />
            {loadingSSO ? "Redirecionando..." : "Login via SSO"}
          </Button>
          <div className="flex justify-center items-center gap-2">
            <p className="text-muted-foreground flex justify-center text-[15px]">
              (Recomendado)
            </p>
            <button 
            title="O acesso utiliza Single Sign-On (SSO). Após entrar com sua conta Microsoft, você acessará o SharePoint sem uma nova autenticação.">
            <FontAwesomeIcon className="text-muted-foreground hover:text-black transition-all text-sm" icon={faCircleQuestion} />
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="border-t border-0.1 border-gray-400/20 flex-grow"></div>
            <div className="px-3 text-gray-800/30 text-sm">OU</div>
            <div className="border-t border-0.1 border-gray-400/20 flex-grow"></div>
          </div>

          <div className="flex flex-col mb-4">
          <label className="text-sm">E-mail</label>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div> 

          <div className="flex flex-col">
          <label className="text-sm">Senha</label>
          <Input
            placeholder="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>

          <p className="text-muted-foreground mb-5 p-3 text-[10px]">
            {" "}
            Por favor, peça o acesso para o administrador caso não tenha e-mail
            cadastrado ou entre via SSO.
          </p>

          <Button onClick={loginWithPassword} disabled={loadingPassword}>
            {loadingPassword ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </div>
  );
}