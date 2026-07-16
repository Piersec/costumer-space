"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Save } from "lucide-react"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()

  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSave = () => {
    setShowSaveDialog(false)

    console.log({
      theme,
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Configure o tema do painel
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="space-y-3">
            <Label>Tema</Label>

            <div className="flex gap-3">
              {["light", "dark", "system"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTheme(item)}
                  className={`
                    px-4 py-2 rounded-lg border-2 transition-all capitalize
                    ${
                      theme === item
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted hover:border-primary"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>


          <div className="border-t pt-6">

            <div className="p-4 rounded-lg bg-muted mb-4">
              <h3 className="font-semibold">
                Prévia
              </h3>

              <p className="text-sm text-muted-foreground mt-2">
                O tema selecionado será aplicado em todo o painel.
              </p>
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


      <AlertDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
      >
        <AlertDialogContent>

          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmar Mudanças
            </AlertDialogTitle>

            <AlertDialogDescription>
              O tema será aplicado ao painel inteiro.
              Continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>


          <AlertDialogAction onClick={handleSave}>
            Confirmar
          </AlertDialogAction>

          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>

        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}