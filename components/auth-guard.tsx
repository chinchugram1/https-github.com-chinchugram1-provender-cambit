"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ children, requiredRole, fallback }: AuthGuardProps) {
  const { user, loading, initialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("🔍 [GUARD] AuthGuard estado:")
    console.log("  - Loading:", loading)
    console.log("  - Initialized:", initialized)
    console.log("  - User:", user?.email || "null")
    console.log("  - Required role:", requiredRole || "any")

    if (initialized && !loading) {
      if (!user) {
        console.log("❌ [GUARD] Usuario no autenticado, redirigiendo a login")
        router.push("/")
        return
      }

      if (requiredRole && user.rol !== requiredRole) {
        console.log(`❌ [GUARD] Rol incorrecto. Tiene: ${user.rol}, Requiere: ${requiredRole}`)
        // Redirigir al dashboard correspondiente
        const redirectPath =
          user.rol === "proveedor"
            ? "/proveedor/dashboard"
            : user.rol === "cliente"
              ? "/cliente/dashboard"
              : "/transportista/ruta"
        router.push(redirectPath)
        return
      }

      console.log("✅ [GUARD] Acceso permitido")
    }
  }, [user, loading, initialized, requiredRole, router])

  if (loading || !initialized) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0492C2] mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando autenticación...</p>
          </div>
        </div>
      )
    )
  }

  if (!user) {
    return null // El useEffect se encarga de la redirección
  }

  if (requiredRole && user.rol !== requiredRole) {
    return null // El useEffect se encarga de la redirección
  }

  return <>{children}</>
}
