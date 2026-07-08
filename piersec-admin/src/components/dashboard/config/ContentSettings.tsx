"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Save, Trash2, Loader } from "lucide-react"
import {
  getContentModules,
  updateContentModule,
} from "@/app/admin/(dashboard)/dashboard/config/actions"

interface ContentModule {
  id: string
  name: string
  enabled: boolean
  description: string
}

export function ContentSettings() {
  const [modules, setModules] = useState<ContentModule[]>([])
  const [postsPerPage, setPostsPerPage] = useState("10")
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadModules() {
      try {
        const data = await getContentModules()
        setModules(data)
      } catch (error) {
        console.error("Erro ao carregar módulos:", error)
      } finally {
        setLoading(false)
      }
    }
    loadModules()
  }, [])

  const handleToggleModule = async (id: string) => {
    const module = modules.find((m) => m.id === id)
    if (!module) return

    try {
      await updateContentModule(id, !module.enabled)
      setModules(
        modules.map((m) =>
          m.id === id ? { ...m, enabled: !m.enabled } : m
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar módulo:", error)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      setShowSaveDialog(false)
      // Salvar configuração de posts por página aqui
    } catch (error) {
      console.error("Erro ao salvar:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Conteúdo</CardTitle>
          <CardDescription>
            Controle quais módulos de conteúdo estão ativos no site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">Módulos de Conteúdo</h3>
            <div className="space-y-2">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{module.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {module.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleModule(module.id)}
                    className={`ml-4 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      module.enabled
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {module.enabled ? "Ativo" : "Inativo"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Configurações de Paginação</h3>
            <div className="space-y-2">
              <Label htmlFor="posts-per-page">Posts por página</Label>
              <Input
                id="posts-per-page"
                type="number"
                min="1"
                max="50"
                value={postsPerPage}
                onChange={(e) => setPostsPerPage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Define quantos posts aparecem por página
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <Button
              onClick={() => setShowSaveDialog(true)}
              disabled={isSaving}
              className="w-full"
              size="lg"
            >
              {isSaving ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Mudanças</AlertDialogTitle>
            <AlertDialogDescription>
              Isso alterará quais módulos estão disponíveis no site. Continuar?
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
