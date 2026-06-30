import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-6">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground mt-2">
            Gerencie o conteúdo do site por aqui.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">

            <div className="border rounded-xl p-5">
              <h3 className="font-semibold">
                Notícias
              </h3>

              <p className="text-sm text-muted-foreground">
                0 publicadas
              </p>
            </div>


            <div className="border rounded-xl p-5">
              <h3 className="font-semibold">
                Usuários
              </h3>

              <p className="text-sm text-muted-foreground">
                Controle de acesso
              </p>
            </div>


            <div className="border rounded-xl p-5">
              <h3 className="font-semibold">
                Status
              </h3>

              <p className="text-sm text-muted-foreground">
                Sistema online
              </p>
            </div>

          </div>

        </main>

      </div>

    </div>
  )
}