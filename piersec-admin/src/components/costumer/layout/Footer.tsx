import { ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#0D0D0D] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 py-20">

        {/* TOPO */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 border-b border-white/10 pb-16">

          {/* Marca */}
          <div className="lg:col-span-2">

            <img
              src="./default.png"
              alt="Piersec"
              className="w-24"
            />

            <p className="mt-6 max-w-md text-zinc-400 leading-8">
              Soluções inteligentes em Cybersecurity, Pentest,
              SOC, Cloud Security e Tecnologia para empresas que
              precisam de segurança de verdade.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="https://www.linkedin.com/company/piersec/"
                target="_blank"
                className="
                flex items-center gap-2
                rounded-full
                border border-white/10
                px-5 py-3
                text-sm
                transition
                hover:bg-white
                hover:text-black
                "
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
                Linkedin
              </a>

              <a
                href="https://www.youtube.com/@Piersec"
                target="_blank"
                className="
                flex items-center gap-2
                rounded-full
                border border-white/10
                px-5 py-3
                text-sm
                transition
                hover:bg-red-600
                "
              >
                <FontAwesomeIcon icon={faYoutube} className="text-sm" />
                Youtube
              </a>

            </div>

          </div>

          {/* Navegação */}
          <div>

            <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
              Navegação
            </h3>

            <ul className="space-y-4">

              <li>
                <a className="hover:text-blue-400 transition" href="#">
                  Início
                </a>
              </li>

              <li>
                <a className="hover:text-blue-400 transition" href="#">
                  Notícias
                </a>
              </li>

              <li>
                <a className="hover:text-blue-400 transition" href="#">
                  Piercast
                </a>
              </li>

              <li>
                <a className="hover:text-blue-400 transition" href="#">
                  Eventos
                </a>
              </li>

            </ul>

          </div>

          {/* Serviços */}
          <div>

            <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
              Soluções
            </h3>

            <ul className="space-y-4">

              <li>Pentest</li>
              <li>SOC</li>
              <li>Cloud Security</li>
              <li>Consultoria</li>

            </ul>

          </div>

          {/* CTA */}
          <div className="flex flex-col">

            <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">
              Comece agora
            </h3>

            <a href="https://piersec.com.br/contato/" target="_blank" rel="noopener noreferrer">
            <button
              className="
              bg-white
              text-black
              rounded-full
              px-6
              py-3
              font-medium
              hover:scale-105
              transition
              "
            >
              Solicitar Diagnóstico
            </button>
            </a>

            <a href="https://piersec.com.br/?gad_source=1&gad_campaignid=23966985571&gclid=CjwKCAjwmJjSBhB-EiwAkZgxi-3Dk8zMyjPCJcwYY_4tDGqhUePYNjNHE7y2ZLaalQZmDDDASW0IohoCMJ0QAvD_BwE" target="_blank" rel="noopener noreferrer">
            <button 
              className="
              mt-4
              border
              border-white/10
              rounded-full
              px-6
              py-3
              flex
              items-center
              justify-center
              gap-2
              hover:border-blue-500
              hover:text-blue-400
              transition
              "
            >
              Conhecer Serviços
              <ArrowUpRight size={16} />
            </button>
            </a>

          </div>

        </div>

        {/* LOGO GIGANTE */}
        <div className="py-14 overflow-hidden">

          <h1
            className="
            text-[110px]
            md:text-[170px]
            lg:text-[220px]
            font-black
            tracking-[-10px]
            leading-none
            text-white/5
            select-none
            "
          >
            PIERSEC
          </h1>

        </div>

        {/* RODAPÉ */}
        <div
          className="
          border-t
          border-white/10
          pt-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-6
          "
        >

          <p className="text-zinc-500 text-sm">
            © 2026 Piersec. Todos os direitos reservados.
          </p>

          <div
            className="
            flex
            items-center
            gap-8
            text-sm
            text-zinc-500
            "
          >

            <a href="https://piersec.com.br/politica-de-privacidade/" className="hover:text-white transition">
              Política de Privacidade
            </a>

            <a href="https://piersec.com.br/termos-de-uso/" className="hover:text-white transition">
              Termos de Uso
            </a>

            <span
              className="
              rounded-full
              bg-blue-500/15
              px-4
              py-2
              text-blue-400
              "
            >
              v1.0 Beta (Teste)
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}