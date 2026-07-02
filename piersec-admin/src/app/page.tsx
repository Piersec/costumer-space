"use client"

import { useState } from "react"
import { createClient } from "@/shared/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const supabase = createClient()

async function testUser() {
  const { data, error } = await supabase.auth.getUser()

  console.log("USER:", data.user)
  console.log("ERROR:", error)
}


export default function LoginPage(){

  const supabase = createClient()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


  async function login(){

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })


    if(error){
      alert(error.message)
      return
    }


    window.location.href="/dashboard"

  }


  return (
    <div className=" h-screen flex flex-col items-center justify-center gap-4">

      <Input
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />


      <Input
        placeholder="senha"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />


      <Button onClick={login}>
        Entrar
      </Button>

      <Button onClick={testUser}>
  Testar usuário
</Button>

    </div>
  )
}