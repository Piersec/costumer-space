"use client"

import { useEffect, useState } from "react"

import { getNews } from "./actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {
  createNews,
  updateNews,
  deleteNews
} from "./actions"

import { createClient } from "@/shared/lib/supabase/client"

const supabase = createClient()

const { data } = await supabase.auth.getUser()

console.log(data.user)


export default function NewsPage() {

  const [news, setNews] = useState<any[]>([])


  const [form, setForm] = useState<any>({
  image_url: "",
  image_file: null,
  tag: "",
  title: "",
  description: "",
})

  const [editing, setEditing] = useState(false)

const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{

  async function loadNews(){

    const data = await getNews()

    console.log("NOTICIAS:", data)

    setNews(data ?? [])

  }


  loadNews()

},[])


  function updateField(
    field: string,
    value: string
  ) {

    setForm({
      ...form,
      [field]: value
    })

  }


  async function handleSubmit() {

    setLoading(true)

    try {

      let result


if(editing && selectedId){

  result = await updateNews(
    selectedId,
    form
  )

}else{

  result = await createNews(form)

}

      console.log(result)

      alert("Notícia criada!")

      setForm({
        image_url: "",
        tag: "",
        title: "",
        description: "",
      })


    } catch (error) {

      console.error(error)

      alert("Erro ao criar notícia")

    }


    setLoading(false)

  }



  return (
    <div>
      <div className="mt-8 space-y-4">

{news.map((item)=>(

  <div
    key={item.id}
    className="border rounded-xl p-4 space-y-3"
  >


{item.image_url && (

  <img
    src={item.image_url}
    alt={item.title}
    className="w-full h-48 object-cover rounded-lg"
  />

)}


    <h2 className="font-bold">
      {item.title}
    </h2>


    <p className="text-sm text-muted-foreground">
      {item.tag}
    </p>


    <p>
      {item.description}
    </p>

<Button
  onClick={()=>{

    setEditing(true)

    setSelectedId(item.id)


setForm({
  image_url: "",
  image_file: null,
  tag: "",
  title: "",
  description: "",
})

  }}
>
  Editar
</Button>

<Button
  variant="destructive"
  onClick={async()=>{

    if(!confirm("Excluir essa notícia?"))
      return


    await deleteNews(item.id)


    setNews(
      news.filter(
        (n)=>n.id !== item.id
      )
    )

  }}
>
  Excluir
</Button>

  </div>

))}

</div>

      <h1 className="text-3xl font-bold">
        Notícias
      </h1>


      <p className="text-muted-foreground mt-2">
        Gerencie as notícias do site.
      </p>



      <div className="mt-8 border rounded-xl p-6 space-y-5">

       <input
  type="file"
  accept="image/*"
  onChange={(e)=>{

    const file = e.target.files?.[0]

    if(!file) return


    const img = new Image()


    img.onload = ()=>{


      if(
        img.width !== 1725 ||
        img.height !== 320
      ){

        alert(
          `⚠️ Atenção!\n\n` +
          `O padrão recomendado é 1725x320.\n\n` +
          `Imagem enviada: ${img.width}x${img.height}\n\n` +
          `Você pode continuar, mas ela pode ficar cortada no site.`
        )

      }


      setForm({
        ...form,
        image_file:file
      })


    }


    img.src = URL.createObjectURL(file)

  }}

  className="block w-full text-sm"
/>
       
        <div>
          <Label>
            Tag
          </Label>

          <Input
            value={form.tag}
            onChange={(e)=>updateField(
              "tag",
              e.target.value
            )}
            placeholder="Ex: PIERCAST · Podcast"
          />

        </div>



        <div>
          <Label>
            Título
          </Label>

          <Input
            value={form.title}
            onChange={(e)=>updateField(
              "title",
              e.target.value
            )}
            placeholder="Título da notícia"
          />

        </div>



        <div>
          <Label>
            Descrição
          </Label>

          <Textarea
            value={form.description}
            onChange={(e)=>updateField(
              "description",
              e.target.value
            )}
            placeholder="Descrição da notícia"
          />

        </div>



        <Button
  onClick={handleSubmit}
  disabled={loading}
>
  {loading
    ? "Salvando..."
    : editing
      ? "Atualizar notícia"
      : "Criar notícia"
  }
</Button>


      </div>

    </div>
  )
}