"use server";

import { createClient } from "@/shared/lib/supabase/server";

export async function getPodcasts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("podcasts")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createPodcast(data: any) {
  const supabase = await createClient();

  const { error } = await supabase.from("podcasts").insert({
    video_url: data.video_url,
    episode_code: data.episode_code,
    title: data.title,
    short_description: data.short_description,
    modal_description: data.modal_description,
    topics: data.topics,
    footer_text: data.footer_text,
    channel_link_text: data.channel_link_text,
    channel_link_url: data.channel_link_url,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}

export async function updatePodcast(id: string, data: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("podcasts")
    .update({
      video_url: data.video_url,
      episode_code: data.episode_code,
      title: data.title,
      short_description: data.short_description,
      modal_description: data.modal_description,
      topics: data.topics,
      footer_text: data.footer_text,
      channel_link_text: data.channel_link_text,
      channel_link_url: data.channel_link_url,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}

export async function deletePodcast(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("podcasts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}
