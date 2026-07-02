"use client"

import { useEffect, useState } from "react"
import { getEvents } from "@/app/admin/dashboard/events/actions"
import EventCardLarge from "./EventCardLarge"
import EventCardMedium from "./EventCardMedium"
import EventCardSmall from "./EventCardSmall"

export default function Events() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    loadEvents()
  }, [])

  async function loadEvents() {
    const data = await getEvents()
    setEvents(data ?? [])
  }

  function getCardComponent(index: number, total: number) {
    if (total === 1) return EventCardLarge
    if (total === 2) return EventCardMedium
    if (total >= 3) {
      if (index === 0) return EventCardLarge
      return EventCardSmall
    }
    return EventCardMedium
  }

  if (!events.length) return null

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">
        Próximos Eventos - Piersec
      </h2>

      <div className="grid grid-cols-12 gap-5">
        {events.map((event, index) => {
          const CardComponent = getCardComponent(index, events.length)
          return <CardComponent key={event.id} event={event} />
        })}
      </div>
    </section>
  )
}