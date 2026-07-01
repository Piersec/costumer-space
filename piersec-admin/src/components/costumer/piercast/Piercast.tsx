"use client";

import { useState, useEffect } from "react";

import {
  createPodcast,
  updatePodcast,
  deletePodcast,
  getPodcasts,
} from "@/app/dashboard/piercast/actions";

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
import {
  Plus,
  Pencil,
  Trash2,
  PlayCircle,
  Mic,
  ExternalLink,
  Tags,
} from "lucide-react";

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
    setForm((prev) => ({ ...prev, [field]: value }));
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
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      {/* HEADER REDESENHADO */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            Piercast
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todos os episódios do podcast em um só lugar.
          </p>
        </div>
        <Button onClick={openCreateDialog} size="lg" className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Adicionar Episódio
        </Button>
      </div>

      {/* DIALOG DE CRIAÇÃO / EDIÇÃO REDESENHADO */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editing ? (
                <Pencil className="h-5 w-5 text-primary" />
              ) : (
                <Plus className="h-5 w-5 text-primary" />
              )}
              {editing ? "Editar Episódio" : "Novo Episódio"}
            </DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo. Os campos de tópicos e links são
              opcionais.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* SEÇÃO: VÍDEO E IDENTIFICAÇÃO */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  Link do YouTube
                </Label>
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={form.video_url}
                  onChange={(e) => updateField("video_url", e.target.value)}
                />
                {videoId && (
                  <div className="mt-3 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Pré-visualização
                    </Label>
                    <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="w-full aspect-video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-1">
                  <Label>Código</Label>
                  <Input
                    placeholder="EP-001"
                    value={form.episode_code}
                    onChange={(e) =>
                      updateField("episode_code", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Título</Label>
                  <Input
                    placeholder="Título do episódio"
                    value={form.title}
                    onChange={(e) => updateField("title", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* SEÇÃO: DESCRIÇÕES */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Descrição Curta</Label>
                <Textarea
                  placeholder="Um resumo rápido para o card..."
                  className="resize-none"
                  rows={2}
                  value={form.short_description}
                  onChange={(e) =>
                    updateField("short_description", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Descrição Completa</Label>
                <Textarea
                  placeholder="Descrição detalhada que aparecerá no modal..."
                  className="resize-none"
                  rows={4}
                  value={form.modal_description}
                  onChange={(e) =>
                    updateField("modal_description", e.target.value)
                  }
                />
              </div>
            </div>

            {/* SEÇÃO: TÓPICOS E LINKS (Adicionado pois faltava na UI original) */}
            <div className="space-y-4 border-t border-border pt-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Tags className="h-4 w-4 text-muted-foreground" />
                  Tópicos (separados por vírgula)
                </Label>
                <Input
                  placeholder="Tecnologia, Mercado, IA..."
                  value={form.topics.join(", ")}
                  onChange={(e) =>
                    updateField(
                      "topics",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Texto do Rodapé</Label>
                  <Input
                    placeholder="Ex: Inscreva-se no canal"
                    value={form.footer_text}
                    onChange={(e) =>
                      updateField("footer_text", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto do Link do Canal</Label>
                  <Input
                    placeholder="Ex: Visite nosso site"
                    value={form.channel_link_text}
                    onChange={(e) =>
                      updateField("channel_link_text", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL do Link do Canal</Label>
                <Input
                  placeholder="https://..."
                  value={form.channel_link_url}
                  onChange={(e) =>
                    updateField("channel_link_url", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button
              variant="outline"
              onClick={() => setOpenForm(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Salvando..." : editing ? "Atualizar" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* LISTA DE EPISÓDIOS REDESENHADA */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden border-border/40">
              <Skeleton className="w-full aspect-video rounded-none" />
              <CardContent className="space-y-3 pt-4">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="gap-3 border-t border-border/40 p-4 mt-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : podcasts.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-16 text-center">
          <div className="p-4 bg-muted rounded-full mb-4">
            <Mic className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Nenhum episódio encontrado</h3>
          <p className="text-muted-foreground text-sm mb-4 max-w-sm">
            Parece que você ainda não adicionou nenhum episódio do Piercast.
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Criar primeiro episódio
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((item) => {
            const itemVideoId = getYoutubeId(item.video_url);

            return (
              <Card
                key={item.id}
                className="group overflow-hidden rounded-xl border-border/40 shadow-sm hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <CardHeader className="p-0 relative">
                  {itemVideoId ? (
                    <img
                      src={getThumbnailUrl(itemVideoId)}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          getFallbackThumbnailUrl(itemVideoId);
                      }}
                      alt={item.title}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center">
                      <PlayCircle className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  {/* Overlay com botão de play ao passar o mouse */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-12 w-12"
                      onClick={() =>
                        window.open(item.video_url, "_blank")
                      }
                    >
                      <ExternalLink className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-sm shadow-sm font-mono text-xs"
                    >
                      {item.episode_code}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 p-5 flex-grow">
                  <CardTitle className="text-base leading-snug font-semibold line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">
                    {item.short_description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="gap-2 border-t border-border/40 bg-muted/20 p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                    onClick={() => openEditDialog(item)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 text-muted-foreground"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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