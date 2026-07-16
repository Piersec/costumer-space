import { Header } from "@/components/dashboard/header";
import { ChartPieDonutText } from "@/components/ui/charts/chart-pie-donut-text";
import { ChartAreaInteractive } from "@/components/ui/charts/chart-area-interactive";
import DevelopmentBadge from "@/components/ui/comingSoon";

import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="p-6 mx-70">
          <h1 className=" mt-10 text-3xl font-bold">Dashboard</h1>

          <p className="text-muted-foreground mt-2">
            Gerencie o conteúdo do site por aqui.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <a
              title="Share Point"
              target="_blank"
              rel="noopener noreferrer"
              href="https://piersec.sharepoint.com"
            >
              <div className="hover:scale-105 transition-all duration-500">
                <Image
                  src="/cards/sharepoint.png"
                  alt="Marketing Card"
                  width={500}
                  height={300}
                  loading="eager"
                  priority
                  className="rounded-lg hover:backdrop-blur-xs border border-border"
                />
              </div>
            </a>
            <a
              href="/admin/dashboard/new-users"
              title="Novos Usuarios"
              rel="noopener noreferrer"
            >
              <div className="hover:scale-105 transition-all duration-500">
                <Image
                  src="/cards/newuser.png"
                  alt="New User Card"
                  width={500}
                  height={300}
                  loading="eager"
                  priority
                  className="rounded-lg hover:backdrop-blur-xs border border-border"
                />
              </div>
            </a>

            <a
              href="/admin/dashboard/costumer-area"
              title="Configurações"
              rel="noopener noreferrer"
            >
              <div className="hover:scale-105 transition-all duration-500">
                <Image
                  src="/cards/areadocliente.png"
                  alt="Config Card"
                  width={500}
                  height={300}
                  loading="eager"
                  priority
                  className="rounded-lg hover:backdrop-blur-xs border border-border"
                />
              </div>
            </a>
          </div>

          {/* ZPT & PIER */}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <a
              href="/admin/em-desenvolvimento"
              title="Em desenvolvimento"
              rel="noopener noreferrer"
            >
              <div className=" transition-all duration-500">
                <div className="absolute top-200 left-77 z-10">
                  <DevelopmentBadge />
                </div>
                <Image
                  src="/cards/cardlogo/pier.png"
                  alt="Em desenvolvimento"
                  width={1175}
                  height={534}
                  loading="eager"
                  priority
                  className="-z-10 saturate-0 opacity-30 rounded-lg hover:backdrop-blur-xs border border-border"
                />
              </div>
            </a>
            <a
              href="/admin/em-desenvolvimento"
              title="Em desenvolvimento"
              rel="noopener noreferrer"
            >
              <div className=" transition-all duration-500">
                <div className="absolute top-199 right-77 z-10">
                  <DevelopmentBadge />
                </div>
                <Image
                  src="/cards/cardlogo/zpt.png"
                  alt="Config Card"
                  width={1198}
                  height={534}
                  loading="eager"
                  priority
                  className="z-0 saturate-0 opacity-30 rounded-lg hover:backdrop-blur-xs border border-border"
                />
              </div>
            </a>
          </div>

          <hr className="my-10" />

          <h2 className="text-2xl font-bold">Estatísticas</h2>
          <div className="grid grid-cols-1 gap-4 mt-5">
            <ChartAreaInteractive />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <ChartPieDonutText />
          </div>
        </main>
      </div>
    </div>
  );
}
