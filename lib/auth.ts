import bcrypt from "bcryptjs"
import { supabaseAdmin } from "./supabase"
import { signJWT, verifyJWT, type JWTPayload } from "./jwt"

export interface User {
  id: string
  nombre: string
  email: string
  rol: string
  empresa_id: string
  empresa_nombre?: string
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  try {
    // Consulta a Supabase para obtener el usuario
    const { data: usuario, error } = await supabaseAdmin
      .from("usuarios")
      .select(`
        id,
        nombre,
        email,
        password_hash,
        rol,
        empresa_id,
        empresas(nombre)
      `)
      .eq("email", email)
      .single()

    if (error || !usuario) {
      console.error("Usuario no encontrado:", error)
      return null
    }

    // Verificar la contraseña con bcrypt
    const isValidPassword = await bcrypt.compare(password, usuario.password_hash)

    if (!isValidPassword) {
      console.error("Contraseña incorrecta")
      return null
    }

    // Retornar datos del usuario
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      empresa_id: usuario.empresa_id,
      empresa_nombre: usuario.empresas?.nombre || "Sin empresa",
    }
  } catch (error) {
    console.error("Error validando credenciales:", error)
    return null
  }
}

export async function createJWTToken(user: User): Promise<string> {
  const payload: JWTPayload = {
    id_usuario: user.id,
    email: user.email,
    rol: user.rol,
    empresa_id: user.empresa_id,
  }

  return await signJWT(payload)
}

export async function validateJWTToken(token: string): Promise<JWTPayload | null> {
  return await verifyJWT(token)
}
