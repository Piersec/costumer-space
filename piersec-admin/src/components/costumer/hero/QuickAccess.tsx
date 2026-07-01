const actions = [
  {
    title: "Base de",
    subtitle: "Conhecimento",
    icon: "📚",
    link: "https://piersec.freshdesk.com/support/solutions",
  },

  {
    title: "Chamado",
    subtitle: "Técnico",
    icon: "✉️",
    link: "https://piersec.freshdesk.com/support/tickets/new",
  },

  {
    title: "Fluxo",
    subtitle: "Guardião",
    icon: "👤",
    link: "#",
  },

  {
    title: "PIER360",
    subtitle: "SOC",
    icon: "🖥️",
    link: "#",
  },

  {
    title: "Pier Human",
    subtitle: "Risk",
    icon: "📚",
    link: "#",
  },
];

export default function QuickAccess() {
  return (
    <section className="mt-20 mb-16">
      <h2 className="text-3xl font-bold mb-15">⚡ Acesso Rápido</h2>

      <div className="flex gap-5 flex-wrap">
        {actions.map((item) => (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            className="
            w-[210px]
            h-[200px]
            border
            rounded-2xl
            flex
            flex-col
            items-center
            justify-center
            text-center
            transition
            hover:-translate-y-2
            hover:bg-gray-100
            backdrop-blur-md
            "
            >
            <div className="text-5xl mb-5">{item.icon}</div>

            <span className="font-bold text-2xl">{item.title} <br/> {item.subtitle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
