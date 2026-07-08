import { Suspense } from "react";
import SideLogin from "@/components/sideLogin";
import Login from "@/components/loginForm";

export default function LoginPage() {
  return (
    <main className="h-screen overflow-hidden p-8">
      <div className="">
        <Suspense fallback={<div>Carregando...</div>}>
          <Login />
        </Suspense>
      </div>
    </main>
  );
}