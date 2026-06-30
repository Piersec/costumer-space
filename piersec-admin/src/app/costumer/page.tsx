import Header from "@/components/costumer/layout/Header"
import Footer from "@/components/costumer/layout/Footer"

import Hero from "@/components/costumer/hero/Hero"
import QuickAccess from "@/components/costumer/hero/QuickAccess"
import NewsCarousel from "@/components/costumer/news/NewsCarousel"
import Piercast from "@/components/costumer/piercast/Piercast"
import Events from "@/components/costumer/events/Events"


export default function Home(){

return (

<>

<Header />


<main className="
max-w-[1400px]
mx-auto
px-10
">


<Hero />

<QuickAccess />

<NewsCarousel />

<div className="my-14 border-t"/>


<Piercast />


<div className="my-14 border-t"/>


<Events />


</main>


<Footer />


</>

)

}