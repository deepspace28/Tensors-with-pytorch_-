"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScientificLogo } from "@/components/scientific-logo"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [institution, setInstitution] = useState("")
  const { signup, isLoading, error, clearError } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signup(name, email, password, institution)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#282a36]">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#44475a] border-[#6272a4] text-white">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <ScientificLogo className="h-10 w-10 text-[#ff79c6]" />
            </div>
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-[#f8f8f2] opacity-80 text-center">
              Join Synaptiq to access advanced scientific AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800 text-white">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#f8f8f2]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Dr. Jane Smith"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    clearError()
                  }}
                  required
                  className="bg-[#282a36] border-[#6272a4] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#f8f8f2]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="researcher@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    clearError()
                  }}
                  required
                  className="bg-[#282a36] border-[#6272a4] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-[#f8f8f2]">
                  Institution (Optional)
                </Label>
                <Input
                  id="institution"
                  type="text"
                  placeholder="University or Research Institute"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-[#282a36] border-[#6272a4] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#f8f8f2]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    clearError()
                  }}
                  required
                  className="bg-[#282a36] border-[#6272a4] text-white placeholder:text-gray-500"
                />
                <p className="text-xs text-[#f8f8f2] opacity-70">Password must be at least 6 characters long</p>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#ff79c6] hover:bg-[#ff92d0] text-[#282a36]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-[#f8f8f2]">
              <span>Already have an account? </span>
              <Link href="/login" className="text-[#8be9fd] hover:underline">
                Log in
              </Link>
            </div>
            <div className="text-center text-xs text-[#f8f8f2] opacity-70">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
