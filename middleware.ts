import { type NextRequest, NextResponse } from "next/server"
import { readSession } from "@/lib/session"

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const token = req.cookies.get("session")?.value
  const sess = await readSession(token)
  const path = req.nextUrl.pathname

  console.log("🔍 [MIDDLEWARE] Path:", path, "Session:", !!sess)

  // La página de login es la raíz "/"
  const isLogin = path === "/"

  // Si no hay sesión y no está en login, redirigir a "/"
  if (!sess && !isLogin) {
    console.log("🔄 [MIDDLEWARE] Sin sesión, redirigiendo a /")
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Si hay sesión y está en login, redirigir a su panel
  if (sess && isLogin) {
    const targetPath = sess.rol === "proveedor" ? "/proveedor" : sess.rol === "cliente" ? "/cliente" : "/transportista"
    console.log("🔄 [MIDDLEWARE] Con sesión en login, redirigiendo a:", targetPath)
    url.pathname = targetPath
    return NextResponse.redirect(url)
  }

  // Protección de rutas por rol
  if (sess) {
    if (path.startsWith("/proveedor") && sess.rol !== "proveedor") {
      console.log("❌ [MIDDLEWARE] Acceso denegado a /proveedor")
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
    if (path.startsWith("/cliente") && sess.rol !== "cliente") {
      console.log("❌ [MIDDLEWARE] Acceso denegado a /cliente")
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
    if (path.startsWith("/transportista") && sess.rol !== "transportista") {
      console.log("❌ [MIDDLEWARE] Acceso denegado a /transportista")
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
}
