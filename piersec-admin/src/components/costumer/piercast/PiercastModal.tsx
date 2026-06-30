"use client"


export default function PiercastModal({
close
}:{
close:()=>void
}){


return (

<div

className="
fixed
inset-0
bg-black/50
backdrop-blur
flex
items-center
justify-center
z-50
"


>


<div className="
bg-white
rounded-2xl
w-[90%]
max-w-5xl
max-h-[90vh]
overflow-auto
p-6
relative
">


<button

onClick={close}

className="
absolute
right-5
top-5
bg-gray-100
rounded-full
w-10
h-10
"

>

✕

</button>



<iframe

src="https://www.youtube.com/embed/VIut_xK91GI?start=69&rel=0"

className="
w-full
h-[450px]
rounded-xl
"

allowFullScreen

/>




<div className="mt-6">


<h2 className="
text-3xl
font-bold
mb-5
">

O que diferencia um técnico de um executivo de tecnologia?

</h2>



<p className="
text-gray-600
leading-8
">

Neste episódio do PierCast, Alex conversa com Fernando Justino,
executivo de tecnologia com mais de 20 anos de experiência em
infraestrutura, operações, gestão e liderança.

</p>



<h3 className="
text-xl
font-bold
mt-8
mb-5
">

Falamos sobre:

</h3>



<ul className="
space-y-3
">


<li>
✓ Evolução de carreira técnica para executivo
</li>


<li>
✓ Gestão de risco e decisão estratégica
</li>


<li>
✓ Backup e continuidade de negócios
</li>


<li>
✓ Tecnologia gerando valor
</li>


<li>
✓ Inteligência Artificial
</li>


<li>
✓ Liderança e equipes
</li>


</ul>



<div className="
mt-8
p-5
bg-blue-50
rounded-xl
">

🚀 Uma conversa prática para profissionais de tecnologia,
gestores e líderes.

</div>


</div>



</div>


</div>

)

}