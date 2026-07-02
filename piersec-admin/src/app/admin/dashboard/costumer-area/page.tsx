import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { Header } from "@/components/dashboard/header";

export default function costumerArea() {
    return (
        <>
        <div className="flex justify-center flex-col mx-70">

            <Header />

        <a className="flex justify-center" href="/costumer" target="_blank" rel="noopener noreferrer">
        <div className="flex justify-center items-center w-100 mt-10 bg-black px-8 py-2 font-bold text-white hover:scale-105 transition-all duration-500 rounded-full ease-out ">
            
                <button className="flex items-center gap-2">
                <h1 >Área do Cliente | Visão do Cliente</h1>
                <FontAwesomeIcon className="w-6" icon={faSquareArrowUpRight} />
                </button>
            
        </div>
        </a>
        </div>
        </>
    )
}