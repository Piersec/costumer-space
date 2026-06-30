"use client"

import { useEffect, useState } from "react"

import PiercastModal from "./PiercastModal"

import { getPodcasts } from "@/app/dashboard/piercast/actions"



export default function Piercast(){


const [open,setOpen] = useState(false)

const [piercasts,setPiercasts] = useState<any[]>([])



useEffect(()=>{

loadPiercast()

},[])



async function loadPiercast(){

const data = await getPodcasts()

setPiercasts(data ?? [])

}



if(!piercasts.length){

return null

}



const piercast = piercasts[0]



return (

<section className="
grid
grid-cols-2
gap-10
items-center
my-12
">



{/* VIDEO */}

<div className="
rounded-2xl
overflow-hidden
shadow-xl
">


<iframe

src={piercast.youtube_url}

title={piercast.title}

className="
w-full
h-[400px]
"

allow="
accelerometer;
autoplay;
clipboard-write;
encrypted-media;
gyroscope;
picture-in-picture
"

allowFullScreen

/>

</div>





{/* CONTENT */}

<div>



<span className="
text-blue-500
font-bold
uppercase
tracking-wide
">

{piercast.badge}

</span>





<h2 className="
text-5xl
font-bold
my-5
leading-tight
">


{piercast.title}


</h2>





<p className="
text-gray-500
text-lg
leading-8
">


{piercast.description}


</p>







<button

onClick={()=>setOpen(true)}

className="
mt-8
border
border-blue-500
text-blue-500
px-6
py-4
rounded-xl
hover:bg-blue-500
hover:text-white
transition
"

>

Ler mais sobre o episódio →

</button>




</div>






{
open &&

<PiercastModal

data={piercast}

close={()=>setOpen(false)}

/>

}




</section>

)

}