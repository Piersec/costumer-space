"use client"

import { useDominantColor } from "@/hooks/useDominantColor"
import { formatDateToShort } from "@/shared/utils/formatDate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

export default function EventCardSmall({ event }: { event: any }) {
  const dominantColor = useDominantColor(event.image_url)
  const formattedDate = formatDateToShort(event.date || event.date_label)

  return (
    <a
      href={event.event_link}
      target="_blank"
      className="block col-span-3 h-[200px]"
    >
      <article className="group flex h-full w-full rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
        {/* IMAGEM DE FUNDO COM BLUR E ESCURECIMENTO */}
        <div className="absolute inset-0">
          <img
            src={event.image_url}
            className="w-full h-full object-cover blur-md scale-110"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* DATA */}
        <div 
          className="w-[120px] bg-black/40 backdrop-blur-md flex flex-col items-center justify-center shrink-0 relative z-10"
        >
          <span 
            className="font-bold text-5xl"
            style={{ color: dominantColor }}
          >
            {formattedDate.day}
          </span>
          <span 
            className="font-semibold text-lg uppercase"
            style={{ color: dominantColor }}
          >
            {formattedDate.month}
          </span>
        </div>

        {/* CONTEÚDO */}
        <div className="relative flex-1 overflow-hidden ">
          <img
            src={event.image_url}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 h-full p-4 flex flex-col justify-center text-white">
            <h3 className="text-2xl font-bold mt-2 line-clamp-2">
              {event.title}
            </h3>

            <div className="flex gap-3 mt-2 text-xs">
              <span>📍 {event.location}</span>
              <span> {event.time_label}</span>
            </div>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-sm transition group-hover:bg-white/40">
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </article>
    </a>
  )
}