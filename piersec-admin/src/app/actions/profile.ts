"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getProfile() {
  const supabase = await createClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return null;
}

const { data } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .maybeSingle();

  if (!user) return null;

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("name, lastname, company, phone, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    return null;
  }

  if (!profile) {
    const { data: created, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
      })
      .select("name, lastname, company, phone, avatar_url")
      .single();

    if (createError) {
      return null;
    }

    profile = created;
  }

  return {
    ...profile,
    email: user.email ?? "",
  };
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado." };

  const payload = {
    id: user.id,
    name: String(formData.get("name") ?? "").trim(),
    lastname: String(formData.get("lastname") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
  };

  const avatarUrl = formData.get("avatar_url");
  if (typeof avatarUrl === "string" && avatarUrl) {
    (payload as any).avatar_url = avatarUrl;
  }

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) return { error: "Erro ao salvar perfil." };

  revalidatePath("/", "layout");
  return { success: true };
}