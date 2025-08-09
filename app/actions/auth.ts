"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { admin } from "@/lib/supabase/admin"
import { compare } from "bcryptjs"
import { createSession, cookieName } from "@/lib/session"

export async function loginAction(formData: FormData) {
  console.log("🔍 [ACTION] loginAction iniciado")

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase()
  const password = String(formData.get("password") || "")

  console.log("🔍 [ACTION] Email:", email)
  console.log("🔍 [ACTION] Password length:", password?.length)

  if (!email || !password) {
    console.log("❌ [ACTION] Faltan credenciales")
    return { error: "Email y contraseña requeridos" }
  }

  try {
    console.log("🚀 Consultando usuario en base de datos...")
    const { data, error } = await admin
      .from("usuarios")
      .select("id, empresa_id, pass_hash, rol, activo")
      .eq("email", email)
      .limit(1)
      .maybeSingle()

    console.log("📊 Resultado consulta:", { data: !!data, error: !!error })

    if (error) {
      console.log("❌ Error en consulta:", error)
      return { error: "Error al consultar usuario" }
    }

    if (!data || !data.activo) {
      console.log("❌ Usuario no encontrado o inactivo")
      return { error: "Usuario inválido o inactivo" }
    }

    console.log("🔐 Verificando contraseña...")
    const ok = await compare(password, data.pass_hash)
    if (!ok) {
      console.log("❌ Contraseña incorrecta")
      return { error: "Credenciales incorrectas" }
    }

    console.log("✅ Contraseña correcta, creando sesión...")
    const token = await createSession({
      uid: data.id,
      empresa_id: data.empresa_id,
      rol: data.rol as "proveedor" | "cliente" | "transportista",
    })

    const cookieStore = cookies()
    cookieStore.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })

    console.log("✅ Login exitoso, redirigiendo según rol:", data.rol)

    switch (data.rol) {
      case "proveedor":
        console.log("🔄 [ACTION] Redirigiendo a /proveedor")
        redirect("/proveedor")
      case "cliente":
        console.log("🔄 [ACTION] Redirigiendo a /cliente")
        redirect("/cliente")
      case "transportista":
        console.log("🔄 [ACTION] Redirigiendo a /transportista")
        redirect("/transportista")
      default:
        console.log("🔄 [ACTION] Redirigiendo a / (default)")
        redirect("/")
    }
  } catch (error) {
    console.log("❌ Error inesperado:", error)
    return { error: "Error interno del servidor" }
  }
}

export async function logoutAction() {
  console.log("🔍 [ACTION] logoutAction iniciado")
  const cookieStore = cookies()
  cookieStore.set(cookieName, "", { path: "/", maxAge: 0 })
  console.log("🔄 [ACTION] Redirigiendo a /")
  redirect("/")
}
