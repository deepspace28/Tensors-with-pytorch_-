"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

interface User {
  id: string
  name: string
  email: string
  hasPendingBetaRequest: boolean
  betaRequestData: any
}

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  login: (email: string) => Promise<boolean>
  logout: () => void
  joinBeta: (userData: {
    name: string
    email: string
    organization: string
    role: string
    researchInterest: string
    background: string
  }) => Promise<boolean>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user data exists in local storage on component mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    // Update local storage whenever the user state changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const login = async (email: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate user data
    const newUser: User = {
      id: "123",
      name: "Test User",
      email: email,
      hasPendingBetaRequest: false,
      betaRequestData: null,
    }

    setUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  // Update the joinBeta function to handle additional fields
  const joinBeta = async (userData: {
    name: string
    email: string
    organization: string
    role: string
    researchInterest: string
    background: string
  }) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just update the local state

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update user state
    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        hasPendingBetaRequest: true,
        betaRequestData: userData,
      }
    })

    return true
  }

  const value: UserContextType = {
    user,
    setUser,
    login,
    logout,
    joinBeta,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
