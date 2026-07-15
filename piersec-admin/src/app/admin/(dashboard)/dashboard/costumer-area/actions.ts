"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserName() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("name, lastname")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return `${data.name} ${data.lastname}`;
}