"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Save, AlertTriangle, ShieldCheck } from "lucide-react"

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [passwordExpiry, setPasswordExpiry] = useState("90")
  const [ipWhitelist, setIpWhitelist] = useState("192.168.1.1\n10.0.0.0/8")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSave = () => {
    setShowSaveDialog(false)
    console.log({
      twoFactorEnabled,
      sessionTimeout,
      passwordExpiry,
      ipWhitelist,
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie configurações de segurança do site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Dica de Segurança</AlertTitle>
            <AlertDescription>
              Mantenha as configurações de segurança atualizadas para proteger seu site
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                <p className="text-sm text-muted-foreground">
                  Requer verificação adicional no login
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  twoFactorEnabled
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {twoFactorEnabled ? "Ativo" : "Inativo"}
              </button>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Políticas de Acesso</h3>

            <div className="space-y-2">
              <Label htmlFor="session-timeout">
                Tempo de Sessão (minutos)
              </Label>
              <Input
                id="session-timeout"
                type="number"
                min="5"
                max="1440"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Tempo máximo antes de expirar a sessão
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-expiry">
                Expiração de Senha (dias)
              </Label>
              <Input
                id="password-expiry"
                type="number"
                min="1"
                max="365"
                value={passwordExpiry}
                onChange={(e) => setPasswordExpiry(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Força atualização de senha após X dias
              </p>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Whitelist de IP</h3>
            <div className="space-y-2">
              <Label htmlFor="ip-whitelist">
                IPs Autorizados (um por linha)
              </Label>
              <textarea
                id="ip-whitelist"
                value={ipWhitelist}
                onChange={(e) => setIpWhitelist(e.target.value)}
                className="w-full px-3 py-2 border rounded-md border-input bg-background font-mono text-sm"
                rows={4}
                placeholder="192.168.1.1&#10;10.0.0.0/8"
              />
              <p className="text-xs text-muted-foreground">
                Deixe em branco para desabilitar
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <Button
              onClick={() => setShowSaveDialog(true)}
              className="w-full"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações de Segurança
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Confirmar Alterações de Segurança
            </AlertDialogTitle>
            <AlertDialogDescription>
              Alterações de segurança podem afetar o acesso dos usuários. Tem
              certeza que deseja continuar?
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
