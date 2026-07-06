"use client";

import { useEffect, useState } from "react";

import { getNews } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { createNews, updateNews, deleteNews } from "./actions";
import NewsCarousel from "@/components/costumer/news/NewsCarousel";

// Removed top-level Supabase client usage to avoid module evaluation during build

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    image_url: "",
    image_file: null,
    tag: "",
    title: "",
    description: "",
  });

  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadNews() {
      const data = await getNews();

      console.log("NOTICIAS:", data);

      setNews(data ?? []);
    }

    loadNews();
  }, []);

  function updateField(field: string, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm({
      image_url: "",
      image_file: null,
      tag: "",
      title: "",
      description: "",
    });
    setEditing(false);
    setSelectedId(null);
    setPreview(false);
  }

  function handleEdit(item: any) {
    setEditing(true);
    setSelectedId(item.id);
    setForm({
      image_url: item.image_url,
      image_file: null,
      tag: item.tag,
      title: item.title,
      description: item.description,
    });
    setPreview(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir essa notícia?")) return;

    try {
      await deleteNews(id);
      setNews(news.filter((n) => n.id !== id));
      alert("Notícia excluída!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir notícia");
    }
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("tag", form.tag);
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.image_file) {
        formData.append("image_file", form.image_file);
      } else if (form.image_url && form.image_url.startsWith("http")) {
        formData.append("image_url", form.image_url);
      }

      let result;

      if (editing && selectedId) {
        result = await updateNews(selectedId, formData);
      } else {
        result = await createNews(formData);
      }

      console.log(result);

      alert(editing ? "Notícia atualizada!" : "Notícia criada!");

      resetForm();

      const updatedNews = await getNews();
      setNews(updatedNews ?? []);
    } catch (error) {
      console.error(error);

      alert(editing ? "Erro ao atualizar notícia" : "Erro ao criar notícia");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          {editing ? "Editar notícia" : "Nova notícia"}
        </h1>

        <p className="text-muted-foreground mt-2">
          Gerencie as notícias do site.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* FORMULÁRIO */}

        <div className="border rounded-xl p-6 space-y-5">

          <div>
            <Label>Imagem</Label>

            <Input
              className="mt-3 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                const img = new Image();

                img.onload = () => {
                  if (
                    img.width !== 1725 ||
                    img.height !== 320
                  ) {
                    alert(
                      `A resolução recomendada é 1725x320.\n\nImagem enviada: ${img.width}x${img.height}`
                    );
                  }

                  setForm((prev: any) => ({
                    ...prev,
                    image_file: file,
                    image_url: URL.createObjectURL(file),
                  }));
                };

                img.src = URL.createObjectURL(file);
              }}
            />
          </div>

          {form.image_url && (
            <img
              src={form.image_url}
              alt=""
              className="w-full h-52 object-cover rounded-xl border"
            />
          )}

          <div>
            <Label>Tag</Label>

            <Input
              value={form.tag}
              onChange={(e) =>
                updateField("tag", e.target.value)
              }
              placeholder="PIERCAST • Podcast"
            />
          </div>

          <div>
            <Label>Título</Label>

            <Input
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="Título da notícia"
            />
          </div>

          <div>
            <Label>Descrição</Label>

            <Textarea
              rows={6}
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Descrição da notícia"
            />
          </div>

          <div className="flex gap-3">

            {editing && (
              <Button
                variant="secondary"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() =>
                setPreview(!preview)
              }
            >
              {preview
                ? "Ocultar preview"
                : "Pré-visualizar"}
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? "Salvando..."
                : editing
                ? "Salvar alterações"
                : "Criar notícia"}
            </Button>

          </div>

        </div>

        {/* PREVIEW */}

        <div className="border rounded-xl p-6 space-y-5">

          <h2 className="text-xl font-semibold mb-5">
            Preview
          </h2>

          {preview ? (
            <div className="space-y-5">
              {/* Preview Individual */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Visualização Individual</h3>
                <div className="border rounded-xl overflow-hidden">

                  {form.image_url ? (
                    <img
                      src={form.image_url}
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="h-52 bg-muted flex items-center justify-center text-muted-foreground">
                      Nenhuma imagem
                    </div>
                  )}

                  <div className="p-6 space-y-4">

                    <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                      {form.tag || "TAG"}
                    </span>

                    <h2 className="text-2xl font-bold">
                      {form.title || "Título da notícia"}
                    </h2>

                    <p className="text-muted-foreground">
                      {form.description ||
                        "Descrição da notícia..."}
                    </p>

                  </div>

                </div>
              </div>

              {/* Preview Carousel */}
              {news.length > 0 && (
                <div className="w-full">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">Carrossel ao vivo</h3>
                  <div className="w-full">
                    <NewsCarousel />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-80 rounded-xl flex items-center justify-center text-muted-foreground">
              Clique em "Pré-visualizar"
            </div>
          )}

        </div>

      </div>

      <div className="mt-14 space-y-6">

        <h2 className="text-2xl font-bold">
          Notícias publicadas
        </h2>
        {news.length === 0 ? (
          <div className="border rounded-xl p-10 text-center text-muted-foreground">
            Nenhuma notícia cadastrada.
          </div>
        ) : (
          <div className="grid gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl overflow-hidden bg-background"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-60 object-cover"
                  />
                )}

                <div className="p-6 space-y-4">
                  <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                    {item.tag}
                  </span>

                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
