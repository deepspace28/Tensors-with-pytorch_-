"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "guest" | "researcher" | "admin"
  institution?: string
  profileImage?: string
}

type AuthState = {
  step: "idle" | "requestingOTP" | "verifyingOTP" | "authenticated"
  email?: string
  error?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  authState: AuthState
  requestOTP: (email: string) => Promise<void>
  verifyOTP: (email: string, code: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, institution?: string) => Promise<void>
  logout: () => void
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [authState, setAuthState] = useState<AuthState>({ step: "idle" })
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("synaptiq-user")
        const token = localStorage.getItem("synaptiq-token")

        if (storedUser && token) {
          // In a real app, you would validate the token with your backend
          setUser(JSON.parse(storedUser))
          setAuthState({ step: "authenticated" })
        }
      } catch (err) {
        console.error("Authentication error:", err)
        localStorage.removeItem("synaptiq-user")
        localStorage.removeItem("synaptiq-token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const requestOTP = async (email: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setAuthState({ step: "requestingOTP", email })

      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code")
      }

      setAuthState({ step: "verifyingOTP", email })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send verification code")
      setAuthState({ step: "idle", error: err instanceof Error ? err.message : "Failed to send verification code" })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (email: string, code: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid verification code")
      }

      // Store token
      localStorage.setItem("synaptiq-token", data.token)

      // Create user object
      const newUser: User = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? "admin" : "researcher",
        profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${email.split("@")[0]}`,
      }

      // Save user to localStorage
      localStorage.setItem("synaptiq-user", JSON.stringify(newUser))
      setUser(newUser)
      setAuthState({ step: "authenticated" })

      // Redirect to home page after successful login
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed")
      setAuthState({
        step: "verifyingOTP",
        email,
        error: err instanceof Error ? err.message : "Verification failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    // Legacy login method - now we use OTP
    // For backward compatibility
    try {
      setIsLoading(true)
      setError(null)

      // Redirect to OTP flow
      await requestOTP(email)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, institution?: string) => {
    // Legacy signup method - now we use OTP
    // For backward compatibility
    try {
      setIsLoading(true)
      setError(null)

      // Redirect to OTP flow
      await requestOTP(email)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("synaptiq-user")
    localStorage.removeItem("synaptiq-token")
    setUser(null)
    setAuthState({ step: "idle" })
    router.push("/")
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        authState,
        requestOTP,
        verifyOTP,
        login,
        signup,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
