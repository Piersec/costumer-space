"use client";

import { useState, useEffect } from "react";

import { getPodcasts } from "@/app/dashboard/piercast/actions";

import PodcastCard from "./Podcastcard";
import PiercastModal from "./PiercastModal";

import { Skeleton } from "@/components/ui/skeleton";

interface Podcast {
  id: string;
  video_url: string;
  episode_code: string;
  title: string;
  short_description: string;
  modal_description: string;
  topics: string[];
  footer_text: string;
  channel_link_text: string;
  channel_link_url: string;
}

export default function Piercast() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<Podcast | null>(null);

  useEffect(() => {
    loadPodcasts();
  }, []);

  async function loadPodcasts() {
    setIsLoading(true);

    try {
      const data = await getPodcasts();
      setPodcasts(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-6 max-w-3xl">
            <Skeleton className="w-full sm:w-80 shrink-0 aspect-video rounded-xl" />

            <div className="flex flex-1 flex-col justify-center gap-2 py-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (podcasts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {podcasts.map((item) => (
        <PodcastCard
          key={item.id}
          episodeCode={item.episode_code}
          title={item.title}
          shortDescription={item.short_description}
          videoUrl={item.video_url}
          onReadMore={() => setSelected(item)}
        />
      ))}

      {selected && (
        <PiercastModal
          title={selected.title}
          description={selected.modal_description}
          videoUrl={selected.video_url}
          topics={selected.topics}
          footerText={selected.footer_text}
          close={() => setSelected(null)}
        />
      )}
    </div>
  );
}