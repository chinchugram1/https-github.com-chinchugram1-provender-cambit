"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { admin } from "@/lib/supabase/admin"
import { compare } from "bcryptjs"
import { createSession, cookieName } from "@/lib/session"

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") || "")

  if (!email || !password) return { error: "Email y contraseña requeridos" }

  const { data, error } = await admin
    .from("usuarios")
    .select("id, empresa_id, pass_hash, rol, activo")
    .eq("email", email)
    .limit(1)
    .maybeSingle()

  if (error || !data || !data.activo) {
    return { error: "Usuario inválido o inactivo" }
  }

  const ok = await compare(password, data.pass_hash)
  if (!ok) return { error: "Credenciales incorrectas" }

  const token = await createSession({
    uid: data.id,
    empresa_id: data.empresa_id,
    rol: data.rol as "proveedor" | "cliente" | "transportista",
  })

  cookies().set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  switch (data.rol) {
    case "proveedor":
      redirect("/proveedor")
    case "cliente":
      redirect("/cliente")
    case "transportista":
      redirect("/transportista")
    default:
      redirect("/")
  }
}

export async function logoutAction() {
  cookies().set(cookieName, "", { path: "/", maxAge: 0 })
  redirect("/login")
}
