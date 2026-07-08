"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/client";
import { Clock3 } from "lucide-react";

export default function WaitingApprovalPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel>;

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      // Verifica se já foi aprovado
      const { data: admin } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (admin) {
        router.push("/admin/dashboard");
        return;
      }

      // Escuta novas aprovações
      channel = supabase
        .channel(`admin-approval-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "admin_users",
          },
          (payload) => {
            if (payload.new.user_id === user.id) {
              router.push("/admin/dashboard");
            }
          }
        )
        .subscribe();
    };

    init();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl border p-8 text-center">
        <div className="mb-6 flex justify-center">
          <Clock3 className="h-10 w-10" />
        </div>

        <h1 className="text-2xl font-bold">
          Aguardando aprovação
        </h1>

        <p className="mt-4 text-muted-foreground">
          Seu cadastro foi enviado para análise.
          Esta página será atualizada automaticamente
          quando sua conta for aprovada.
        </p>
      </div>
    </div>
  );
}