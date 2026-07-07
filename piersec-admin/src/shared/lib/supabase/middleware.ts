import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_DOMAIN = "@piersec.com.br";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);

            supabaseResponse = NextResponse.next({
              request,
            });

            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Atualiza a sessão do usuário
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/unauthorized");

  // Não logado tentando acessar rota protegida -> login
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Logado, mas tentando acessar /admin sem domínio @piersec.com.br
  if (user && pathname.startsWith("/admin")) {
    const email = user.email?.toLowerCase() ?? "";

    if (!email.endsWith(ADMIN_DOMAIN)) {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  // Logado tentando acessar /login -> manda pra área certa
  if (user && pathname.startsWith("/login")) {
    const email = user.email?.toLowerCase() ?? "";
    const url = request.nextUrl.clone();
    url.pathname = email.endsWith(ADMIN_DOMAIN)
      ? "/admin/dashboard"
      : "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}