import { redirect } from "next/navigation";

import { createClient } from "@/shared/lib/supabase/server";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";

import UserActions from "./UserActions";

export default async function ApprovalsPage() {
  const supabase = await createClient();

  // Verifica se está logado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Verifica se é super admin
  const { data: admin } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (admin?.role !== "super_admin") {
    redirect("/admin/dashboard");
  }

  // Busca usuários pendentes
  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("status", "pending")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <div className="mx-auto max-w-7xl py-10">
        <p className="text-destructive">
          Erro ao carregar aprovações.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-10">
      <div>
        <h1 className="text-3xl font-bold">
          Aprovações
        </h1>

        <p className="text-muted-foreground">
          Usuários aguardando aprovação.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="p-4 text-left">
                Usuário
              </th>

              <th className="p-4 text-left">
                Empresa
              </th>

              <th className="p-4 text-right">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.length ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-muted/50"
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

                  <td className="p-4">
                    {user.company ?? "-"}
                  </td>

                  <td className="p-4 text-right">
                    <UserActions
                      userId={user.id}
                      email={user.email}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-10 text-center text-muted-foreground"
                >
                  Nenhum usuário aguardando aprovação.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}