import { createClient } from "@/shared/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";
import ApprovalsPage from "./approvals/ApprovalsTable";
import UserDetailsButton from "@/components/ui/UserDetailsButton";

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="mx-auto max-w-7xl py-10">
        <p className="text-destructive">Erro ao carregar usuários.</p>
      </div>
    );
  }

  function getStatusBadge(status: string | null) {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 border border-green-600/50">
            Ativo
          </Badge>
        );

      case "blocked":
        return (
          <Badge
            className="bg-red-500 border border-red-600/50"
            variant="destructive"
          >
            Bloqueado
          </Badge>
        );

      default:
        return (
          <Badge
            className="animation bg-animate-pulse bg-amber-300 border border-amber-400/50"
            variant="secondary"
          >
            Pendente
          </Badge>
        );
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold">Usuários</h1>

        <p className="text-muted-foreground">
          Gerencie os usuários do painel administrativo.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="p-4 text-left">Usuário</th>

              <th className="p-4 text-left">Empresa</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Criado em</th>

              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {users?.length ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <ProfileAvatar
                        avatarUrl={user.avatar_url}
                        name={`${user.name ?? ""} ${user.lastname ?? ""}`}
                        size={40}
                      />

                      <div>
                        <p className="font-medium">
                          {user.name || user.lastname
                            ? `${user.name ?? ""} ${user.lastname ?? ""}`
                            : "Usuário sem nome"}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{user.company ?? "-"}</td>

                  <td className="p-4">{getStatusBadge(user.status)}</td>

                  <td className="p-4">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="p-4 text-right">
                    <UserDetailsButton user={user} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-10 text-center text-muted-foreground"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ApprovalsPage />
    </div>
  );
}
