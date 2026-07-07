import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin/dashboard";
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Usuário cancelou o login ou a Microsoft retornou erro
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(error)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    console.error("Erro ao trocar code por sessão:", exchangeError.message);
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}