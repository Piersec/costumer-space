"use server";

import { createClient } from "@/lib/supabase/server";

export async function getEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
}

export async function createEvent(payload: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateEvent(id: string, payload: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}
