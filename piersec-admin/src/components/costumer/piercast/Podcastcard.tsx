"use client";

import { Play, ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

interface PodcastCardProps {
  episodeCode: string;
  title: string;
  shortDescription: string;
  videoUrl: string;
  onReadMore?: () => void;
}

function getYoutubeId(url: string): string {
  if (!url) return "";

  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[1].length === 11 ? match[1] : "";
}

function getThumbnailUrl(videoId: string): string {
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";
}

export default function PodcastCard({
  episodeCode,
  title,
  shortDescription,
  videoUrl,
  onReadMore,
}: PodcastCardProps) {
  const videoId = getYoutubeId(videoUrl);
  const thumbnailUrl = getThumbnailUrl(videoId);

  return (
    <div className="flex flex-col sm:flex-row gap-6 max-w-3xl">
      {/* THUMBNAIL */}
      <a
        href={videoUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full sm:w-80 shrink-0 aspect-video overflow-hidden rounded-xl bg-neutral-800"
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
          />
        ) : null}

        {/* PLAY BUTTON */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-xs border-white/20 transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 fill-white text-white ml-0.5" />
          </div>
        </div>

        {/* WATCH ON YOUTUBE TAG */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 backdrop-blur-sm">
          <FontAwesomeIcon icon={faYoutube} className="text-white"/>
          <span className="text-xs font-medium text-white">
            Assistir no YouTube
          </span>
        </div>
      </a>

      {/* CONTENT */}
      <div className="flex flex-col justify-center gap-2 py-1">
        <span className="text-sm font-semibold text-blue-600">
          PIERCAST #{episodeCode.replace(/^#/, "")}
        </span>

        <h3 className="text-lg font-bold leading-snug text-foreground">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {shortDescription}
        </p>

        <button
          onClick={onReadMore}
          className="group/link mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 border-b border-transparent hover:border-blue-600"
        >
          Ler mais sobre o episódio
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}