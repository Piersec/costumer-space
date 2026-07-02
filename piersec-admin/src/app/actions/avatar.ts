"use server";

import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 2 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Nenhum arquivo enviado." };
  }
  if (!ACCEPTED.includes(file.type)) {
    return { error: "Formato inválido." };
  }
  if (file.size > MAX_SIZE) {
    return { error: "Arquivo maior que 2MB." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (uploadError) return { error: "Falha ao enviar imagem." };

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(path);

  const publicUrl = urlData.publicUrl;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", user.id);

  if (updateError) return { error: "Imagem enviada, mas falha ao atualizar perfil." };

  return { url: publicUrl };
}