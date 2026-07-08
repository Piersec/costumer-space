"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Copy, Unlink, Loader } from "lucide-react"
import {
  getIntegrations,
  updateIntegration,
} from "@/app/admin/(dashboard)/dashboard/config/actions"

interface Integration {
  id: string
  name: string
  icon: string
  status: "connected" | "disconnected"
  description: string
  api_key?: string
}

export function IntegrationsSettings() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    async function loadIntegrations() {
      try {
        const data = await getIntegrations()
        setIntegrations(data)
      } catch (error) {
        console.error("Erro ao carregar integrações:", error)
      } finally {
        setLoading(false)
      }
    }
    loadIntegrations()
  }, [])

  const handleConnect = async (id: string) => {
    setIsUpdating(true)
    try {
      await updateIntegration(id, { status: "connected" })
      setIntegrations(
        integrations.map((i) =>
          i.id === id ? { ...i, status: "connected" } : i
        )
      )
    } catch (error) {
      console.error("Erro ao conectar integração:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDisconnect = async () => {
    if (selectedIntegration) {
      setIsUpdating(true)
      try {
        await updateIntegration(selectedIntegration, { status: "disconnected" })
        setIntegrations(
          integrations.map((i) =>
            i.id === selectedIntegration
              ? { ...i, status: "disconnected" }
              : i
          )
        )
        setShowDisconnectDialog(false)
        setSelectedIntegration(null)
      } catch (error) {
        console.error("Erro ao desconectar integração:", error)
      } finally {
        setIsUpdating(false)
      }
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>
            Conecte serviços externos para expandir a funcionalidade do seu site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.id} className="border">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{integration.icon}</span>
                          <div>
                            <h4 className="font-semibold">{integration.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            integration.status === "connected"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {integration.status === "connected"
                            ? "Conectado"
                            : "Desconectado"}
                        </Badge>
                      </div>

                      {integration.status === "connected" &&
                        integration.api_key && (
                          <div className="bg-muted p-2 rounded text-xs font-mono break-all flex items-center justify-between">
                            <span className="flex-1">
                              {integration.api_key.substring(0, 10)}...
                            </span>
                            <button
                              onClick={() =>
                                handleCopyKey(integration.api_key || "")
                              }
                              className="ml-2 p-1 hover:bg-gray-400 rounded"
                              title="Copiar chave"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        )}

                      <div className="flex gap-2">
                        {integration.status === "connected" ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            disabled={isUpdating}
                            onClick={() => {
                              setSelectedIntegration(integration.id)
                              setShowDisconnectDialog(true)
                            }}
                          >
                            {isUpdating ? (
                              <>
                                <Loader className="h-3 w-3 mr-1 animate-spin" />
                                Desconectando...
                              </>
                            ) : (
                              <>
                                <Unlink className="h-3 w-3 mr-1" />
                                Desconectar
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full"
                            disabled={isUpdating}
                            onClick={() => handleConnect(integration.id)}
                          >
                            {isUpdating ? (
                              <>
                                <Loader className="h-3 w-3 mr-1 animate-spin" />
                                Conectando...
                              </>
                            ) : (
                              "Conectar"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold mb-4">Webhooks</h3>
            <Card className="border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">URL do Webhook</Label>
                    <Input
                      id="webhook-url"
                      type="url"
                      defaultValue="https://seu-site.com/webhooks"
                      disabled
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use esta URL para configurar webhooks em serviços
                      externos
                    </p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar URL
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={showDisconnectDialog}
        onOpenChange={setShowDisconnectDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Desconexão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja desconectar esta integração? Isso pode
              afetar funcionalidades do site que dependem desta integração.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={handleDisconnect}
            className="bg-red-500 hover:bg-red-600"
          >
            Desconectar
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
