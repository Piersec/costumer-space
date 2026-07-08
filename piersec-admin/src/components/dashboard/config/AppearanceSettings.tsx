"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Save } from "lucide-react"

export function AppearanceSettings() {
  const [theme, setTheme] = useState("system")
  const [primaryColor, setPrimaryColor] = useState("#3b82f6")
  const [accentColor, setAccentColor] = useState("#ef4444")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSave = () => {
    setShowSaveDialog(false)
    console.log({
      theme,
      primaryColor,
      accentColor,
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Customize a aparência do seu site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Tema</Label>
            <div className="flex gap-3">
              {["light", "dark", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                    theme === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground hover:border-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary-color">Cor Primária</Label>
            <div className="flex gap-3 items-center">
              <input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-12 w-20 rounded cursor-pointer border border-input"
              />
              <span className="text-sm font-mono text-muted-foreground">
                {primaryColor}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accent-color">Cor de Destaque</Label>
            <div className="flex gap-3 items-center">
              <input
                id="accent-color"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-12 w-20 rounded cursor-pointer border border-input"
              />
              <span className="text-sm font-mono text-muted-foreground">
                {accentColor}
              </span>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="p-4 rounded-lg bg-muted mb-4">
              <h3 className="font-semibold mb-3">Prévia</h3>
              <div className="flex gap-3">
                <button
                  style={{ backgroundColor: primaryColor }}
                  className="px-4 py-2 text-white rounded"
                >
                  Botão Primário
                </button>
                <button
                  style={{ backgroundColor: accentColor }}
                  className="px-4 py-2 text-white rounded"
                >
                  Botão Destaque
                </button>
              </div>
            </div>
            <Button
              onClick={() => setShowSaveDialog(true)}
              className="w-full"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Aparência
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Mudanças</AlertDialogTitle>
            <AlertDialogDescription>
              As mudanças de aparência serão aplicadas a todo o site. Continuar?
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
