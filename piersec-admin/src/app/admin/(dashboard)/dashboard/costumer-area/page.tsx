"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

import PodcastsPage from "../piercast/piercast";
import NewsPage from "../news/noticias";
import EventsPage from "../events/eventos";

import Image from "next/image";

import { Header } from "@/components/dashboard/header";

export default function costumerArea() {
  const [activePage, setActivePage] = useState<string | null>(null);

  const renderPage = () => {
    switch (activePage) {
      case "news":
        return <NewsPage />;

      case "podcasts":
        return <PodcastsPage />;

      case "events":
        return <EventsPage />;

      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex justify-center flex-col mx-70">
        <hr className="mt-10" />

        <a
          className="flex justify-center"
          href="/costumer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex justify-center items-center w-100 my-10 bg-black px-8 py-2 font-bold text-white hover:scale-105 transition-all duration-500 rounded-full ease-out ">
            <button className="flex items-center gap-2">
              <h1>Área do Cliente | Visão do Cliente</h1>
              <FontAwesomeIcon className="w-6" icon={faSquareArrowUpRight} />
            </button>
          </div>
        </a>

        <hr />

        <div>
          <h1 className="text-2xl font-bold mt-10">
            Olá, ! O que você gostaria de fazer hoje?
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div
            onClick={() => setActivePage("news")}
            className="cursor-pointer hover:scale-105 transition-all duration-500 opacity-10 hover:opacity-100"
          >
            <Image
              src="/cards/noticias.png"
              alt="Marketing Card"
              width={500}
              height={300}
              className="rounded-lg border border-border"
            />
          </div>

          <div
            onClick={() => setActivePage("podcasts")}
            className="cursor-pointer hover:scale-105 transition-all duration-500 opacity-10 hover:opacity-100"
          >
            <Image
              src="/cards/piercast.png"
              alt="New User Card"
              width={500}
              height={300}
              className="rounded-lg border border-border"
            />
          </div>

          <div
            onClick={() => setActivePage("events")}
            className="cursor-pointer hover:scale-105 transition-all duration-500 opacity-10 hover:opacity-100"
          >
            <Image
              src="/cards/eventos.png"
              alt="Config Card"
              width={500}
              height={300}
              className="rounded-lg border border-border"
            />
          </div>
        </div>
      </div>
      <div className="my-10">{renderPage()}</div>
    </>
  );
}
