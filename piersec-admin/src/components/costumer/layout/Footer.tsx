export default function Footer(){


return (

<footer className="
mt-20
border-t
bg-gray-50
">


<div className="
max-w-7xl
mx-auto
px-10
py-16
grid
grid-cols-3
gap-10
">


<div>

<img

src="/images/logos/black.png"

className="w-40"

/>


<p className="
mt-5
text-gray-500
">

Soluções inteligentes em Cybersecurity e Tecnologia.

</p>


</div>




<div>


<h3 className="
font-bold
mb-5
">

Navegação

</h3>


<ul className="
space-y-3
text-gray-500
">

<li>Início</li>
<li>Notícias</li>
<li>Piercast</li>
<li>Eventos</li>

</ul>


</div>





<div>


<h3 className="
font-bold
mb-5
">

Conecte-se

</h3>


<div className="
flex
gap-4
">


<a
href="https://www.linkedin.com/company/piersec/"
target="_blank"
>
Linkedin
</a>


<a
href="https://www.youtube.com/@Piersec"
target="_blank"
>
Youtube
</a>


</div>


</div>



</div>



<div className="
border-t
py-5
text-center
text-sm
text-gray-500
">


© 2026 Piersec. Todos os direitos reservados.


<span className="
ml-3
bg-blue-100
text-blue-600
px-3
py-1
rounded
">

Versão teste

</span>


</div>



</footer>

)

}