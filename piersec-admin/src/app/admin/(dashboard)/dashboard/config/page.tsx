import { Header } from "@/components/dashboard/header"
import { ConfigurationTabs } from "@/components/dashboard/config/ConfigurationTabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConfigPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="p-6 mx-70">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-3">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground mt-2">
                Gerencie todas as configurações do seu site
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Dica:</strong> Alterações em algumas configurações podem exigir uma atualização do site. Certifique-se de fazer backup das suas configurações importantes.
            </p>
          </div>

          <ConfigurationTabs />
        </main>
      </div>
    </div>
  )
}
