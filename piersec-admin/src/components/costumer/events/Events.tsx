"use client"

import { useEffect, useState } from "react"
import { getEvents } from "@/app/dashboard/events/actions"


export default function Events(){


const [events,setEvents] = useState<any[]>([])



useEffect(()=>{

loadEvents()

},[])



async function loadEvents(){

const data = await getEvents()

setEvents(data ?? [])

}



function getEventSize(index:number){

const total = events.length


if(total === 1){
return "col-span-12 h-[300px]"
}


if(total === 2){

return "col-span-6 h-[220px]"

}



if(total === 3){

if(index === 0){

return "col-span-12 h-[300px]"

}


return "col-span-6 h-[220px]"

}



if(total >= 4){

return "col-span-4 h-[200px]"

}


}



if(!events.length){

return null

}



return (


<section className="my-12">


<h2 className="
text-3xl
font-bold
mb-6
">

Próximos Eventos - Piersec

</h2>




<div className="
grid
grid-cols-12
gap-5
">



{
events.map((event,index)=>(


<a

key={event.id}

href={event.event_link}

target="_blank"

className={`
block
${getEventSize(index)}
`}

>





<article className="
group
flex
h-full
rounded-3xl
overflow-hidden
shadow-lg
transition-all
duration-300
hover:-translate-y-1
">





{/* DATA */}

<div className="
w-[150px]
bg-gradient-to-b
from-[#4b2d1d]
to-[#2a1a12]
flex
flex-col
items-center
justify-center
shrink-0
">


<span className="
text-orange-400
font-bold
text-2xl
uppercase
">

{event.date_label?.split(" ")[0]}

</span>




<span className="
text-orange-400
text-5xl
font-extrabold
">

{
event.date_label?.split(" ")[1]
}


</span>


</div>







{/* IMAGEM */}


<div className="
relative
flex-1
overflow-hidden
">



<img

src={event.image_url}

className="
absolute
inset-0
w-full
h-full
object-cover
transition
duration-500
group-hover:scale-105
"

/>





<div className="
absolute
inset-0
bg-gradient-to-r
from-black/70
via-black/40
to-transparent
"/>





<div className="
relative
z-10
h-full
p-7
flex
flex-col
justify-center
text-white
">





<span className="
w-fit
px-3
py-1
rounded-full
bg-white/20
backdrop-blur
text-xs
font-semibold
">

{event.badge}

</span>







<h3 className="
text-2xl
font-bold
mt-3
">

{event.title}

</h3>







<p className="
text-white/80
mt-2
line-clamp-3
">

{event.description}

</p>







<div className="
flex
gap-6
mt-3
text-sm
">

<span>
📍 {event.location}
</span>


<span>
🕒 {event.time_label}
</span>


</div>





</div>






<div className="
absolute
right-8
top-1/2
-translate-y-1/2
w-14
h-14
rounded-full
bg-white/20
backdrop-blur
flex
items-center
justify-center
text-white
text-2xl
transition
group-hover:bg-white/40
">

→

</div>





</div>





</article>


</a>



))

}





</div>



</section>


)

}