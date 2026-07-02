import SideLogin from "@/components/sideLogin";
import Login from "@/components/loginForm";

export default function LoginPage() {
  return (
    <main className="h-screen overflow-hidden p-8">
  <div className="grid h-full grid-cols-[420px_1fr] gap-10">
    <Login />

    <div className="flex justify-end">
      <SideLogin />
    </div>
  </div>
</main>
  );
}