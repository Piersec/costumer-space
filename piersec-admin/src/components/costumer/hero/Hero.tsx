"use client";

export default function Hero() {
  return (
    <section className="">
      <img
        src="/hero-image.png"
        className="absolute -top-20 left-0 z-0 w-full h-full object-cover"
      />
      <div className="relative z-10 py-20">
        <h1 className="text-7xl font-bold">Olá! 👋</h1>
        <p className="text-4xl mt-5 mb-20">
          Acesse rapidamente os principais <br /> conteúdos e serviços da <span className="font-bold">Piersec</span>.
        </p>
      </div>
    </section>
  );
}
