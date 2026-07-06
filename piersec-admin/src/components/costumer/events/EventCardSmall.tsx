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
      <article className="group flex h-full w-60 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
        {/* IMAGEM DE FUNDO COM BLUR E ESCURECIMENTO */}
        <div className="absolute inset-0">
          <img
            src={event.image_url}
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* DATA */}
        <div 
          className="w-full bg-black/5 backdrop-blur-sm flex flex-col items-center justify-center shrink-0 relative z-10"
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
          <div className="relative z-10 h-full p-4 flex flex-col justify-center text-white">


          </div>

      </article>
    </a>
  )
}