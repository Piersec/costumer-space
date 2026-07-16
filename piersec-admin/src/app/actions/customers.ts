"use server";

import { createClient } from "@/shared/lib/supabase/server";

export async function getCompanies() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createCompany({
  name,
  domain,
}: {
  name: string;
  domain: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies")
    .insert({
      name,
      domain,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
