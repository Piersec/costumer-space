import { Header } from "@/components/dashboard/header"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">

      <div className="flex-1">

        <main className="p-6 mx-70">

                 <Header />

          <h1 className=" mt-10 text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground mt-2">
            Gerencie o conteúdo do site por aqui.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">

            <div>
              
            </div>

          </div>

        </main>

      </div>

    </div>
  )
}