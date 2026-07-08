"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/lib/supabase/server";

export async function approveUser(
  userId: string,
  email: string
) {
  const supabase = await createClient();

    const { data: existingAdmin } = await supabase
  .from("admin_users")
  .select("id")
  .eq("user_id", userId)
  .maybeSingle();

if (!existingAdmin) {
  const { error: adminError } = await supabase
    .from("admin_users")
    .insert({
      user_id: userId,
      email,
      role: "admin",
    });

  if (adminError) {
    throw new Error(adminError.message);
  }
}

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      status: "approved",
    })
    .eq("id", userId);

  if (profileError) {
    throw new Error(profileError.message);
  }

  revalidatePath("/admin/dashboard/users");
  revalidatePath("/admin/dashboard/users/approvals");
}

export async function blockUser(
  userId: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      status: "blocked",
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/dashboard/users");
  revalidatePath("/admin/dashboard/users/approvals");
}