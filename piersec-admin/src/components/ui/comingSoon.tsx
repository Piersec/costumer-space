export default function DevelopmentBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 shadow-lg backdrop-blur">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-amber-400/50" />
        <div className="relative h-2 w-2 rounded-full bg-amber-400" />
      </div>

      <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-sm font-medium text-transparent">
        Em desenvolvimento
      </span>
    </div>
  );
}