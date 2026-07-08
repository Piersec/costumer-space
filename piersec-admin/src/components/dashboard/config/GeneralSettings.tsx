"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Save, AlertCircle } from "lucide-react"

export function GeneralSettings() {
  const [siteName, setSiteName] = useState("Piersec Admin")
  const [siteDescription, setSiteDescription] = useState("Painel administrativo Piersec")
  const [siteUrl, setSiteUrl] = useState("https://piersec.com.br")
  const [supportEmail, setSupportEmail] = useState("suporte@piersec.com.br")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSave = () => {
    setShowSaveDialog(false)
    // Aqui você faria a chamada para a API para salvar as configurações
    console.log({
      siteName,
      siteDescription,
      siteUrl,
      supportEmail,
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>
            Gerencie as configurações básicas do seu site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site-name">Nome do Site</Label>
            <Input
              id="site-name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Nome do seu site"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-description">Descrição do Site</Label>
            <Textarea
              id="site-description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              placeholder="Descrição breve do seu site"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-url">URL do Site</Label>
            <Input
              id="site-url"
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://seu-site.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-email">Email de Suporte</Label>
            <Input
              id="support-email"
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="suporte@seu-site.com"
            />
          </div>

          <div className="border-t pt-6">
            <Button
              onClick={() => setShowSaveDialog(true)}
              className="w-full"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Salvar</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja salvar essas configurações? Esta ação pode afetar todo o site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={handleSave}>
            Confirmar
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
