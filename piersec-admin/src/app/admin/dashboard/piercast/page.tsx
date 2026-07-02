"use client";

import { useState, useEffect } from "react";

import {
  createPodcast,
  updatePodcast,
  deletePodcast,
  getPodcasts,
} from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, PlayCircle } from "lucide-react";

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

type PodcastFormData = Omit<Podcast, "id">;

const EMPTY_FORM: PodcastFormData = {
  video_url: "",
  episode_code: "",
  title: "",
  short_description: "",
  modal_description: "",
  topics: [],
  footer_text: "",
  channel_link_text: "",
  channel_link_url: "",
};

function getYoutubeId(url: string): string {
  if (!url) return "";

  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[1].length === 11 ? match[1] : "";
}

function getThumbnailUrl(videoId: string): string {
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";
}

function getFallbackThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [form, setForm] = useState<PodcastFormData>(EMPTY_FORM);
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);

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

  function updateField<K extends keyof PodcastFormData>(
    field: K,
    value: PodcastFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditing(false);
    setSelectedId(null);
  }

  function openCreateDialog() {
    resetForm();
    setOpenForm(true);
  }

  function openEditDialog(podcast: Podcast) {
    setEditing(true);
    setSelectedId(podcast.id);

    setForm({
      video_url: podcast.video_url,
      episode_code: podcast.episode_code,
      title: podcast.title,
      short_description: podcast.short_description,
      modal_description: podcast.modal_description,
      topics: podcast.topics ?? [],
      footer_text: podcast.footer_text ?? "",
      channel_link_text: podcast.channel_link_text ?? "",
      channel_link_url: podcast.channel_link_url ?? "",
    });

    setOpenForm(true);
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      if (editing && selectedId) {
        await updatePodcast(selectedId, form);
      } else {
        await createPodcast(form);
      }

      await loadPodcasts();

      setOpenForm(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar episódio");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja excluir este episódio?")) return;

    try {
      await deletePodcast(id);
      await loadPodcasts();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir episódio");
    }
  }

  const videoId = getYoutubeId(form.video_url);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🎙️ PIERCAST</h1>

          <p className="text-muted-foreground mt-2">
            Gerencie todos os episódios do podcast.
          </p>
        </div>

        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4" />
          Novo episódio
        </Button>
      </div>

      {/* DIALOG DE CRIAÇÃO / EDIÇÃO */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-xl">
          <Card className="border-none shadow-none">
            <DialogHeader>
              <CardHeader className="p-0">
                <DialogTitle asChild>
                  <CardTitle>
                    {editing ? "Editar episódio" : "Novo episódio"}
                  </CardTitle>
                </DialogTitle>

                <DialogDescription asChild>
                  <CardDescription>
                    Preencha as informações do episódio abaixo.
                  </CardDescription>
                </DialogDescription>
              </CardHeader>
            </DialogHeader>

            <CardContent className="p-0 mt-5 space-y-5">
              {/* LINK DO YOUTUBE */}
              <div className="space-y-2">
                <Label>Link do YouTube</Label>

                <Input
                  placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
                  value={form.video_url}
                  onChange={(e) => updateField("video_url", e.target.value)}
                />

                {videoId && (
                  <div className="mt-3 space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                      <PlayCircle className="h-4 w-4" />
                      Pré-visualização
                    </Label>

                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full aspect-video rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              {/* EPISÓDIO */}
              <div className="space-y-2">
                <Label>Código do episódio</Label>

                <Input
                  placeholder="#EP001"
                  value={form.episode_code}
                  onChange={(e) =>
                    updateField("episode_code", e.target.value)
                  }
                />
              </div>

              {/* TÍTULO */}
              <div className="space-y-2">
                <Label>Título</Label>

                <Input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>

              {/* DESCRIÇÃO CURTA */}
              <div className="space-y-2">
                <Label>Descrição curta</Label>

                <Textarea
                  value={form.short_description}
                  onChange={(e) =>
                    updateField("short_description", e.target.value)
                  }
                />
              </div>

              {/* DESCRIÇÃO COMPLETA */}
              <div className="space-y-2">
                <Label>Descrição completa</Label>

                <Textarea
                  value={form.modal_description}
                  onChange={(e) =>
                    updateField("modal_description", e.target.value)
                  }
                />
              </div>
            </CardContent>

            <DialogFooter>
              <CardFooter className="p-0 mt-6 w-full justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving
                    ? "Salvando..."
                    : editing
                    ? "Atualizar episódio"
                    : "Salvar episódio"}
                </Button>
              </CardFooter>
            </DialogFooter>
          </Card>
        </DialogContent>
      </Dialog>

      {/* LISTA DE EPISÓDIOS */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden rounded-xl">
              <Skeleton className="w-full aspect-video" />

              <CardContent className="space-y-3 pt-5">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : podcasts.length === 0 ? (
        <div className="border rounded-xl p-12 text-center text-muted-foreground">
          Nenhum episódio cadastrado ainda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((item) => {
            const itemVideoId = getYoutubeId(item.video_url);

            return (
              <Card
                key={item.id}
                className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <CardHeader className="p-0">
                  {itemVideoId ? (
                    <img
                      src={getThumbnailUrl(itemVideoId)}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          getFallbackThumbnailUrl(itemVideoId);
                      }}
                      alt={item.title}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center">
                      <PlayCircle className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-3 pt-5">
                  <Badge variant="secondary">{item.episode_code}</Badge>

                  <CardTitle className="text-lg leading-snug">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="line-clamp-3">
                    {item.short_description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEditDialog(item)}
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Button>

                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}