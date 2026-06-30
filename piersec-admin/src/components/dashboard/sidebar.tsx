import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-background p-4">
      <h1 className="text-xl font-bold mb-8">
        Piersec Admin
      </h1>

      <nav className="space-y-2">

        <Link
          href="/dashboard"
          className="block rounded-md px-3 py-2 hover:bg-muted"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/news"
          className="block rounded-md px-3 py-2 hover:bg-muted"
        >
          Notícias
        </Link>

        <Link
          href="/dashboard/settings"
          className="block rounded-md px-3 py-2 hover:bg-muted"
        >
          Configurações
        </Link>

      </nav>
    </aside>
  )
}