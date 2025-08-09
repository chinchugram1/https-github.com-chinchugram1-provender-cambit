"use server"

import { login, logout } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("🔍 [ACTION] loginAction iniciado")
  console.log("🔍 [ACTION] Email:", email)
  console.log("🔍 [ACTION] Password length:", password?.length)

  if (!email || !password) {
    console.log("❌ [ACTION] Faltan credenciales")
    return { error: "Email y contraseña son requeridos" }
  }

  console.log("🚀 Iniciando loginAction para:", email)
  const loginStartTime = Date.now()

  const result = await login(email, password)

  console.log(`⏱️ LoginAction completado en ${Date.now() - loginStartTime}ms`)
  console.log("🔍 [ACTION] Resultado del login:", result.success ? "ÉXITO" : "FALLO")

  if (!result.success) {
    console.log("❌ Login falló:", result.message)
    return { error: result.message }
  }

  console.log("✅ Login exitoso, redirigiendo según rol:", result.user?.rol)

  // Redireccionar según el rol del usuario
  switch (result.user?.rol) {
    case "proveedor":
      console.log("🔄 [ACTION] Redirigiendo a /proveedor/dashboard")
      redirect("/proveedor/dashboard")
    case "cliente":
      console.log("🔄 [ACTION] Redirigiendo a /cliente/dashboard")
      redirect("/cliente/dashboard")
    case "transportista":
      console.log("🔄 [ACTION] Redirigiendo a /transportista/ruta")
      redirect("/transportista/ruta")
    default:
      console.log("🔄 [ACTION] Redirigiendo a /proveedor/dashboard (default)")
      redirect("/proveedor/dashboard")
  }
}

export async function logoutAction() {
  console.log("🔍 [ACTION] logoutAction iniciado")
  await logout()
  console.log("🔄 [ACTION] Redirigiendo a /")
  redirect("/")
}
