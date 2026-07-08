"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .maybeSingle();

  if (error) {
    console.log("Erro ao buscar configurações:", error);
    return null;
  }

  return data;
}

export async function updateSettings(payload: any) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado." };

  const { data, error } = await supabase
    .from("settings")
    .upsert(payload, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.log("Erro ao atualizar configurações:", error);
    return { error: "Erro ao salvar configurações." };
  }

  revalidatePath("/dashboard/config");
  return { success: true, data };
}

export async function getUsers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Erro ao buscar usuários:", error);
    return [];
  }

  return data || [];
}

export async function addUser(payload: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.log("Erro ao adicionar usuário:", error);
    throw error;
  }

  revalidatePath("/dashboard/config");
  return data;
}

export async function updateUser(userId: string, payload: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.log("Erro ao atualizar usuário:", error);
    throw error;
  }

  revalidatePath("/dashboard/config");
  return data;
}

export async function deleteUser(userId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (error) {
    console.log("Erro ao deletar usuário:", error);
    throw error;
  }

  revalidatePath("/dashboard/config");
  return { success: true };
}

export async function getContentModules() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_modules")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.log("Erro ao buscar módulos:", error);
    return [];
  }

  return data || [];
}

export async function updateContentModule(moduleId: string, enabled: boolean) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_modules")
    .update({ enabled })
    .eq("id", moduleId)
    .select()
    .single();

  if (error) {
    console.log("Erro ao atualizar módulo:", error);
    throw error;
  }

  revalidatePath("/dashboard/config");
  return data;
}

export async function getIntegrations() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("integrations")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.log("Erro ao buscar integrações:", error);
    return [];
  }

  return data || [];
}

export async function updateIntegration(
  integrationId: string,
  payload: any
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("integrations")
    .update(payload)
    .eq("id", integrationId)
    .select()
    .single();

  if (error) {
    console.log("Erro ao atualizar integração:", error);
    throw error;
  }

  revalidatePath("/dashboard/config");
  return data;
}
