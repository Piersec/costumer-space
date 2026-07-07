"use client";


import Cropper from "react-easy-crop";

import { useEffect, useState, useCallback } from "react";

import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "./actions";

import EventCardLarge from "@/components/costumer/events/EventCardLarge";
import EventCardMedium from "@/components/costumer/events/EventCardMedium";
import EventCardSmall from "@/components/costumer/events/EventCardSmall"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Import } from "lucide-react";

export default function EventsPage() {

  const [editingId, setEditingId] = useState<string | null>(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const [croppedImage, setCroppedImage] = useState("");

  const [events, setEvents] = useState<any[]>([]);

  const [image, setImage] = useState("");

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [preview, setPreview] = useState(false);

  const [form, setForm] = useState({
    image_url: "",
    date_label: "",
    badge: "",
    title: "",
    description: "",
    location: "",
    time_label: "",
    event_link: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const data = await getEvents();

    setEvents(data ?? []);
  }

  function updateField(field: string, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  function editEvent(event: any) {
  setEditingId(event.id);

  setForm({
    image_url: event.image_url,
    date_label: event.date_label,
    badge: event.badge,
    title: event.title,
    description: event.description,
    location: event.location,
    time_label: event.time_label,
    event_link: event.event_link,
  });

  setCroppedImage(event.image_url);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  function selectImage(e: any) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);

      setCroppedImage("");
    };

    reader.readAsDataURL(file);
  }

  async function applyCrop() {
    if (!image || !croppedAreaPixels) return;

    const img = new Image();

    img.src = image;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const { x, y, width, height } = croppedAreaPixels;

    canvas.width = width;

    canvas.height = height;

    ctx.drawImage(
      img,

      x,
      y,

      width,
      height,

      0,
      0,

      width,
      height,
    );

    const croppedUrl = canvas.toDataURL("image/jpeg", 0.9);

    setCroppedImage(croppedUrl);

    setImage("");
  }
  function updateEvent(editingId: string, arg1: { image_url: string; date_label: string; badge: string; title: string; description: string; location: string; time_label: string; event_link: string; }) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="mx-80">
      <div className="my-10">
        <h1 className="text-3xl font-bold">EVENTOS</h1>

        <p className="text-muted-foreground">Gerencie eventos do site.</p>
      </div>

      <div className="">
        {/* FORM */}

        <div className=" border rounded-xl p-6 space-y-5">
          <div>
            <Label>Imagem do evento</Label>

            <Input className="cursor-pointer w-full h-40 mt-3 border-dashed" 
            type="file" accept="image/*" onChange={selectImage} />

            {image && (
              <div className="mt-5">
                <div
                  className="
                  relative
                  w-full
                  h-[260px]
                  rounded-xl
                  overflow-hidden
                  bg-muted
                  "
                >
                  {image && !croppedImage && (
                    <div className="mt-5">
                      <div
                        className="
                        relative
                        w-full
                        h-[260px]
                        rounded-xl
                        overflow-hidden
                        bg-black
                        "
                      >
                        <Cropper
                          image={image}
                          crop={crop}
                          zoom={zoom}
                          aspect={1725 / 180}
                          objectFit="contain"
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={(_, pixels) => {
                            setCroppedAreaPixels(pixels);
                          }}
                        />
                      </div>

                      <div className="mt-4">
                        <input
                          type="range"
                          min={1}
                          max={3}
                          step={0.1}
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="w-full"
                        />

                        <Button className="mt-3" onClick={applyCrop}>
                          Aplicar corte
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Label>Zoom</Label>

                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full mt-3"
                  />

                  <Button onClick={applyCrop}>Aplicar corte</Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <Label>Data</Label>

            <Input
              type="date"
              onChange={(e) => updateField("date_label", e.target.value)}
            />
          </div>

          <div>
            <Label>Hora</Label>

            <Input
              type="time"
              onChange={(e) => updateField("time_label", e.target.value)}
            />
          </div>

          <div>
            <Label>Tag</Label>

            <Input
              placeholder="EVENTO"
              value={form.badge}
              onChange={(e) => updateField("badge", e.target.value)}
            />
          </div>

          <div>
            <Label>Título</Label>

            <Input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>

          <div>
            <Label>Descrição</Label>

            <Textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </div>

          <div>
            <Label>Local</Label>

            <Input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>

          <div>
            <Label>Link do evento</Label>

            <Input
              value={form.event_link}
              onChange={(e) => updateField("event_link", e.target.value)}
            />
          </div>

         <div className="flex gap-3">
  {editingId && (
    <Button
      variant="secondary"
      onClick={() => {
        setEditingId(null);

        setForm({
          image_url: "",
          date_label: "",
          badge: "",
          title: "",
          description: "",
          location: "",
          time_label: "",
          event_link: "",
        });

        setCroppedImage("");
      }}
    >
      Cancelar edição
    </Button>
  )}

  <Button className="w-full"
    onClick={async () => {
      if (editingId) {
        await updateEvent(editingId, {
          ...form,
          image_url: croppedImage,
        });
      } else {
        await createEvent({
          ...form,
          image_url: croppedImage,
          is_active: true,
        });
      }

      setEditingId(null);

      setForm({
        image_url: "",
        date_label: "",
        badge: "",
        title: "",
        description: "",
        location: "",
        time_label: "",
        event_link: "",
      });

      setCroppedImage("");

      loadEvents();
    }}
  >
    {editingId ? "Salvar alterações" : "Publicar evento"}
  </Button>
</div>

        {/* PREVIEW */}

        {croppedImage && (
          <div
            className="
            border
            rounded-xl
            overflow-hidden
            h-fit
            "
          >
            <img
              src={croppedImage}
              className="
              w-full
              h-[220px]
              object-cover
              rounded-xl
              "
            />

            <div className="p-5 space-y-3">
              <span className="bg-muted px-3 py-1 rounded-full text-sm">
                {form.badge || "EVENTO"}
              </span>

              <h2 className="text-2xl font-bold">{form.title || "Título"}</h2>

              <p>{form.description}</p>

              <p>📅 {form.date_label}</p>

              <p>⏰ {form.time_label}</p>

              <p>📍 {form.location}</p>
            </div>
          </div>
        )}
      </div>

      </div>

      <div className="space-y-4 mt-10">
  <h2 className="text-xl font-bold">Eventos publicados</h2>

  {events.map((event) => (
    <div
      key={event.id}
      className="border rounded-xl p-5 space-y-6"
    >
      {/* Informações */}
      <div>
        <h3 className="font-bold text-lg">{event.title}</h3>
        <p className="text-muted-foreground">{event.date_label}</p>
      </div>

      {/* Preview */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-semibold">Preview</h4>

        <div className="grid gap-4">
          <EventCardLarge event={event} />
          <EventCardMedium event={event} />
          <EventCardSmall event={event} />
        </div>
      </div>

      <div className="flex gap-2">
  <Button
    variant="outline"
    onClick={() => editEvent(event)}
  >
    Editar
  </Button>

  <Button
    variant="destructive"
    onClick={async () => {
      await deleteEvent(event.id);
      loadEvents();
    }}
  >
    Excluir
  </Button>
</div>
    </div>
  ))}
</div>


    </div>
  );
}
