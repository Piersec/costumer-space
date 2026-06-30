import { createClient } from "@/shared/lib/supabase/client"

const supabase = createClient()

const { data } = await supabase.auth.getUser()

console.log(data.user)