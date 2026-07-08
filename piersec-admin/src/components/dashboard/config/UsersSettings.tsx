"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, UserPlus, Edit2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive"
}

export function UsersSettings() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@piersec.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Editor User",
      email: "editor@piersec.com",
      role: "editor",
      status: "active",
    },
  ])
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState<"admin" | "editor" | "viewer">("editor")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const handleAddUser = () => {
    if (newUserEmail) {
      const newUser: User = {
        id: Date.now().toString(),
        name: newUserEmail.split("@")[0],
        email: newUserEmail,
        role: newUserRole,
        status: "active",
      }
      setUsers([...users, newUser])
      setNewUserEmail("")
      setNewUserRole("editor")
    }
  }

  const handleDeleteUser = () => {
    if (selectedUserId) {
      setUsers(users.filter((u) => u.id !== selectedUserId))
      setShowDeleteDialog(false)
      setSelectedUserId(null)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500"
      case "editor":
        return "bg-blue-500"
      case "viewer":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrador",
      editor: "Editor",
      viewer: "Visualizador",
    }
    return labels[role] || role
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>
            Adicione e gerencie usuários do painel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 bg-muted p-4 rounded-lg">
            <h3 className="font-semibold">Adicionar Novo Usuário</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="new-user-email">Email</Label>
                <Input
                  id="new-user-email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="usuario@exemplo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-user-role">Função</Label>
                <select
                  id="new-user-role"
                  value={newUserRole}
                  onChange={(e) =>
                    setNewUserRole(e.target.value as "admin" | "editor" | "viewer")
                  }
                  className="w-full px-3 py-2 border rounded-md border-input bg-background"
                >
                  <option value="viewer">Visualizador</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddUser} className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Usuários Atuais</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Nome</th>
                    <th className="text-left py-2 px-2">Email</th>
                    <th className="text-left py-2 px-2">Função</th>
                    <th className="text-left py-2 px-2">Status</th>
                    <th className="text-left py-2 px-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">{user.name}</td>
                      <td className="py-2 px-2 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-2 px-2">
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </td>
                      <td className="py-2 px-2">
                        <Badge
                          variant={
                            user.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {user.status === "active"
                            ? "Ativo"
                            : "Inativo"}
                        </Badge>
                      </td>
                      <td className="py-2 px-2 flex gap-2">
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id)
                            setShowDeleteDialog(true)
                          }}
                          className="p-1 hover:bg-red-500/10 text-red-500 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover este usuário? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={handleDeleteUser}
            className="bg-red-500 hover:bg-red-600"
          >
            Remover
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
