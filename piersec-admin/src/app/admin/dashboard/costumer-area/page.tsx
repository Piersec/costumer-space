import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

import { Header } from "@/components/dashboard/header";

export default function costumerArea() {
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
            <h1 className="text-2xl font-bold mt-10">Olá, ! O que você gostaria de fazer hoje?</h1>
        </div>

                  <div className="grid grid-cols-3 gap-4 mt-8">
        
                    <a href="">
                    <div className="hover:scale-105 transition-all duration-500 opacity-10 hover:opacity-100">
                      <Image 
                       src="/cards/noticias.png" 
                       alt="Marketing Card" 
                       width={500} 
                       height={300} 
                       className="rounded-lg hover:backdrop-blur-xs border border-border"
                       />
                    </div>
                    </a>
                    <a href="">
                    <div className="hover:scale-105 transition-all duration-500 opacity-10 hover:opacity-100">
                      <Image 
                       src="/cards/piercast.png" 
                       alt="New User Card" 
                       width={500} 
                       height={300} 
                       className="rounded-lg hover:backdrop-blur-xs border border-border"
                       />
                    </div>
                    </a>
                    <a href="/dashboard/config">
                    <div className="hover:scale-105 transition-all duration-500 opacity-10 hover:opacity-100">
                      <Image 
                       src="/cards/eventos.png" 
                       alt="Config Card" 
                       width={500} 
                       height={300} 
                       className="rounded-lg hover:backdrop-blur-xs border border-border"
                       />
                    </div>
                    </a>
        
                    
        
                  </div>



      </div>
    </>
  );
}
