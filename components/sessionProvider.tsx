"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authClient } from "@/lib/auth-client"

interface User {
  id: string
  name: string
  email: string
  image?: string | null
}

interface Session {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const SessionContext = createContext<Session>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
})

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await authClient.getSession()
        setSession({
          user: data?.user || null,
          isLoading: false,
          isAuthenticated: !!data?.user,
        })
      } catch (error) {
        console.error("Failed to fetch session:", error)
        setSession({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    fetchSession()
  }, [])

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}