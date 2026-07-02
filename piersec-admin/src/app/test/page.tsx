import { createClient } from "@/shared/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  console.log(data?.user)

  return <div>Rota de teste</div>
}