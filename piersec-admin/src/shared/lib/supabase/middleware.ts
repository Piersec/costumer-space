import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_DOMAIN = "@piersec.com.br";

// Prefixos que nunca exigem autenticação
const PUBLIC_ROUTES = [
  "/",
  "/admin/login",
  "/login",
  "/auth",
  "/unauthorized",
];

// Áreas que exigem estar logado
const PROTECTED_AREAS = [
  { prefix: "/admin", loginPath: "/admin/login", restrictToAdminDomain: true },
  { prefix: "/costumer", loginPath: "/login", restrictToAdminDomain: false },
] as const;

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
}

function matchProtectedArea(pathname: string) {
  return PROTECTED_AREAS.find((area) => pathname.startsWith(area.prefix));
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

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
            supabaseResponse = NextResponse.next({ request });
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // getUser() revalida o token direto no servidor da Supabase.
  // Não trocar por getSession() aqui — getSession() confia no cookie
  // sem validar, o que é inseguro dentro de middleware.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const email = user?.email?.toLowerCase() ?? "";

  const area = matchProtectedArea(pathname);

  // Rota pública -> segue o fluxo normal, exceto o caso de já estar
  // logado e tentando acessar a própria página de login (tratado abaixo)
  if (isPublicRoute(pathname)) {
    if (user && (pathname === "/admin/login" || pathname === "/login")) {
      const url = request.nextUrl.clone();
      url.pathname =
        email.endsWith(ADMIN_DOMAIN) ? "/admin/dashboard" : "/costumer";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // A partir daqui, pathname está dentro de alguma área protegida
  if (!area) {
    // Rota não mapeada e não pública -> deixa passar
    // (evita bloquear acidentalmente algo fora do escopo do admin/costumer)
    return supabaseResponse;
  }

  // Não logado tentando acessar área protegida -> manda pro login certo,
  // preservando a URL original em ?next= pra redirecionar depois do login
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = area.loginPath;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Logado, mas área exige domínio @piersec.com.br e o e-mail não bate
  if (area.restrictToAdminDomain && !email.endsWith(ADMIN_DOMAIN)) {
    const url = request.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}