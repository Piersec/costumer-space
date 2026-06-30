"use client"

import { useEffect, useState } from "react"
import { getNews } from "@/app/dashboard/news/actions"


export default function NewsCarousel(){

const [news,setNews] = useState<any[]>([])
const [current,setCurrent] = useState(0)
const [anim,setAnim] = useState(false)



useEffect(()=>{

loadNews()

},[])



async function loadNews(){

const data = await getNews()

setNews(data ?? [])

}



function changeSlide(index:number){

setAnim(true)

setTimeout(()=>{

setCurrent(index)
setAnim(false)

},250)

}



function next(){

changeSlide(
(current + 1) % news.length
)

}



function prev(){

changeSlide(
(current - 1 + news.length) % news.length
)

}



useEffect(()=>{

if(!news.length) return


const timer = setInterval(next,5000)


return ()=>clearInterval(timer)


},[news,current])



if(!news.length) return null



const item = news[current]



return (

<section className="
relative
h-[320px]
rounded-2xl
overflow-hidden
my-10
bg-black
group
">



<img

key={item.id}

src={item.image_url}

className={`
absolute
w-full
h-full
object-cover
transition-all
duration-700

${anim 
? "opacity-0 scale-110"
: "opacity-100 scale-100"
}

group-hover:scale-105

`}

/>



<div className="
absolute
inset-0
bg-gradient-to-t
from-black/90
via-black/40
to-transparent
"/>



<div

className={`
relative
z-10
h-full
flex
flex-col
justify-end
p-10
text-white

transition-all
duration-500

${anim
? "translate-y-5 opacity-0"
: "translate-y-0 opacity-100"
}

`}

>



<span className="
text-blue-400
font-semibold
uppercase
tracking-wider
text-sm
">

{item.badge}

</span>



<h2 className="
text-3xl
font-bold
max-w-2xl
mt-2
">

{item.title}

</h2>



<p className="
mt-3
max-w-xl
text-white/80
">

{item.description}

</p>


</div>





<button

onClick={prev}

className="
absolute
left-5
top-1/2
z-20
w-11
h-11
rounded-full
bg-black/40
text-white
hover:bg-black/70
transition
"

>

‹

</button>




<button

onClick={next}

className="
absolute
right-5
top-1/2
z-20
w-11
h-11
rounded-full
bg-black/40
text-white
hover:bg-black/70
transition
"

>

›

</button>





<div className="
absolute
bottom-5
left-1/2
-translate-x-1/2
flex
gap-2
z-20
">


{news.map((_,i)=>(

<button

key={i}

onClick={()=>changeSlide(i)}

className={`
h-2
rounded-full
transition-all
duration-300

${
i===current
?
"w-8 bg-blue-500"
:
"w-2 bg-white/50"
}

`}

/>


))}


</div>



</section>

)

}