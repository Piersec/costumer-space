import { createClient } from "@/shared/lib/supabase/client"

const supabase = createClient()

export default async function Page() {
  const { data } = await supabase.auth.getUser()

  console.log(data?.user)

  return <div>Rota de teste</div>
}