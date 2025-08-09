import { type NextRequest, NextResponse } from "next/server"
import { validateJWTToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/"]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Obtener token de la cookie
  const token = request.cookies.get("session_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Validar JWT
  const payload = await validateJWTToken(token)

  if (!payload) {
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.delete("session_token")
    return response
  }

  // Verificar autorización por rol
  const userRole = payload.rol

  if (pathname.startsWith("/proveedor") && userRole !== "proveedor" && userRole !== "admin") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname.startsWith("/cliente") && userRole !== "cliente") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname.startsWith("/transportista") && userRole !== "transportista") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
}
