"use server"

import { createClient } from "@/shared/lib/supabase/server"


export async function createNews(data:any){

  const supabase = await createClient()


  let image_url = ""


  if(data.image_file){

    const file = data.image_file


    const fileName =
      `${Date.now()}-${file.name}`


    const { error:uploadError } =
      await supabase.storage
        .from("news")
        .upload(
          fileName,
          file
        )


    if(uploadError){
      throw new Error(uploadError.message)
    }


    const { data:urlData } =
      supabase.storage
        .from("news")
        .getPublicUrl(fileName)


    image_url = urlData.publicUrl

  }



  const { error } =
    await supabase
      .from("news_items")
      .insert({

        image_url,

        tag:data.tag,

        title:data.title,

        description:data.description,

      })


  if(error){
    throw new Error(error.message)
  }


  return {
    success:true
  }

}

export async function getNews() {

  const supabase = await createClient()


  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .order("created_at", {
      ascending: false
    })


  if(error){
    throw new Error(error.message)
  }


  return data

}

export async function updateNews(
  id:string,
  data:any
){

  const supabase = await createClient()


  const { error } =
    await supabase
      .from("news_items")
      .update({

        image_url:data.image_url,
        tag:data.tag,
        title:data.title,
        description:data.description,

      })
      .eq("id",id)


  if(error){
    throw new Error(error.message)
  }


  return {
    success:true
  }

}

export async function deleteNews(id:string){

  const supabase = await createClient()


  const { error } =
    await supabase
      .from("news_items")
      .delete()
      .eq("id", id)


  if(error){
    throw new Error(error.message)
  }


  return {
    success:true
  }

}