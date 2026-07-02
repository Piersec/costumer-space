"use client";

import { faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";

import { useState } from "react";
import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function testUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  console.log("USER:", data?.user);
  console.log("ERROR:", error);
}

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="flex justify-center items-center h-screen">
        
        

      <div className="">
        

      <div className="">
        
        <Button onClick={login} className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <FontAwesomeIcon icon={faMicrosoft} />
          Login via SSO
        </Button>

        <hr />

        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

        <Input
          placeholder="senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={login}>Entrar</Button>
      </div>
      </div>

    </div>
  );
}
