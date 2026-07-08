"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { getProfile, updateProfile } from "@/app/actions/profile";
import { uploadAvatar } from "@/app/actions/avatar";
import { signOut } from "@/app/actions/auth";

type ProfileData = {
  name: string;
  lastname: string;
  company: string;
  phone: string;
  email: string;
  avatar_url: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onAvatarChange?: (url: string) => void; // opcional: atualiza o header em tempo real
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ProfileModal({ open, onClose, onAvatarChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Carrega os dados quando o modal abre
  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getProfile()
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setProfile(data);
          setPreview(data.avatar_url);
        }
      })
      .catch(() => setError("Erro ao carregar perfil."))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Bloqueia scroll do body enquanto aberto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Formato inválido. Use JPEG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("A imagem deve ter no máximo 2MB.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        // 1. Upload do avatar (se houver novo arquivo)
        if (selectedFile) {
          setUploading(true);
          const avatarForm = new FormData();
          avatarForm.append("file", selectedFile);
          const avatarResult = await uploadAvatar(avatarForm);
          setUploading(false);

          if (avatarResult.error) {
            setError(avatarResult.error);
            return;
          }
          if (avatarResult.url) {
            formData.set("avatar_url", avatarResult.url);
            onAvatarChange?.(avatarResult.url);
          }
        }

        // 2. Atualiza dados do perfil
        const result = await updateProfile(formData);
        if (result?.error) {
          setError(result.error);
          return;
        }

        // Sucesso → fecha
        setSelectedFile(null);
        onClose();
      } catch {
        setError("Erro ao salvar alterações. Tente novamente.");
      }
    });
  };

  const handleLogout = async () => {
  await signOut("/admin/login"); // ou "/login", se for a área de cliente
};

  if (!open) return null;

  const modalContent = (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Meu Perfil</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
            aria-label="Fechar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          </div>
        ) : profile ? (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-gray-200 hover:ring-indigo-500 transition"
                aria-label="Alterar foto"
              >
                {preview ? (
                  <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                    <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                  {uploading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                  )}
                </div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-xs text-gray-500">
                JPEG, PNG ou WebP · máx. 2MB
              </p>
            </div>

            {/* Campos */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nome">
                <input
                  name="name"
                  defaultValue={profile.name ?? ""}
                  required
                  className="input"
                />
              </Field>
              <Field label="Sobrenome">
                <input
                  name="lastname"
                  defaultValue={profile.lastname ?? ""}
                  required
                  className="input"
                />
              </Field>
            </div>

            <Field label="Empresa">
              <input
                name="company"
                defaultValue={profile.company ?? ""}
                className="input"
              />
            </Field>

            <Field label="Telefone">
              <input
                name="phone"
                type="tel"
                defaultValue={profile.phone ?? ""}
                className="input"
                placeholder="(00) 00000-0000"
              />
            </Field>

            <Field label="E-mail">
              <input
                type="email"
                value={profile.email}
                disabled
                className="input bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </Field>

            {error && (
              <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            {/* Ações */}
            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Sair da Conta
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {(uploading || isPending) && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {uploading ? "Enviando foto..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        ) : (
          <div className="px-6 py-10 text-center text-gray-500">
            Não foi possível carregar seu perfil.
          </div>
        )}
      </div>

      {/* Tailwind utilitário para os inputs */}
      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input:focus) {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
      `}</style>
    </div>
  );

  // Renderiza via portal para evitar problemas de z-index/overflow
  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}