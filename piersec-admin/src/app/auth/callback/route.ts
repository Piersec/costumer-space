import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    console.error(error, errorDescription);

    return NextResponse.redirect(
      `${origin}/admin/login?error=${encodeURIComponent(error)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth_failed`
    );
  }

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth_failed`
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(
      `${origin}/admin/login`
    );
  }

  // Permite somente usuários da PierSec
  if (!user.email?.endsWith("@piersec.com.br")) {
    await supabase.auth.signOut();

    return NextResponse.redirect(
      `${origin}/admin/login?error=invalid_domain`
    );
  }

  // Busca o profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Primeiro acesso
  if (
    !profile?.name ||
    !profile?.lastname ||
    !profile?.phone
  ) {
    return NextResponse.redirect(
      `${origin}/admin/complete-profile`
    );
  }

  // Verifica se é admin
  const { data: admin } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!admin) {
    return NextResponse.redirect(
      `${origin}/admin/waiting-approval`
    );
  }

  return NextResponse.redirect(
    `${origin}/admin/dashboard`
  );
}