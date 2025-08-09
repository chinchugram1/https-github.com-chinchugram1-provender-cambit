"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  rol: string
  empresa_id: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isLoggedIn: false,
  })

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/session")
      const data = await response.json()

      setAuthState({
        user: data.user || null,
        isLoading: false,
        isLoggedIn: data.loggedIn || false,
      })
    } catch (error) {
      console.error("Error checking session:", error)
      setAuthState({
        user: null,
        isLoading: false,
        isLoggedIn: false,
      })
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setAuthState({
        user: null,
        isLoading: false,
        isLoggedIn: false,
      })
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return {
    ...authState,
    logout,
    refreshSession: checkSession,
  }
}
