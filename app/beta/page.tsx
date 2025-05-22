"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { ScientificLogo } from "@/components/scientific-logo"
import { Check, Search, Lightbulb, Beaker, Sparkles } from "lucide-react"

export default function BetaPage() {
  const { user, joinBeta } = useUser()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await joinBeta(email, name)
      setSuccess(true)
      setTimeout(() => {
        router.push("/chat")
      }, 2000)
    } catch (error) {
      console.error("Error joining beta:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center mb-8">
          <ScientificLogo className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Synaptiq Beta Program</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-[#1a1a1a] border-[#3a3a3a] text-white">
              <CardHeader>
                <CardTitle>Join the Synaptiq Beta Program</CardTitle>
                <CardDescription className="text-gray-400">
                  Get early access to our most advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.isBetaMember ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 text-green-400 mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">You're already a beta member!</h2>
                    <p className="text-gray-400 mb-4">
                      You have access to all beta features including Search, Reason, and Simulations.
                    </p>
                    <Button onClick={() => router.push("/chat")} className="bg-purple-600 hover:bg-purple-700">
                      Go to Chat
                    </Button>
                  </div>
                ) : success ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 text-green-400 mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Welcome to the Beta Program!</h2>
                    <p className="text-gray-400 mb-4">
                      You now have access to all beta features. You'll be redirected to the chat shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                        required
                      />
                    </div>
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Join Beta Program"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-[#1a1a1a] border-[#3a3a3a] text-white">
              <CardHeader>
                <CardTitle>Beta Features</CardTitle>
                <CardDescription className="text-gray-400">
                  Exclusive features available to beta members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-900/30 p-2 rounded-lg">
                    <Search className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Web Search</h3>
                    <p className="text-sm text-gray-400">Search the web for up-to-date information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-900/30 p-2 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Advanced Reasoning</h3>
                    <p className="text-sm text-gray-400">Step-by-step reasoning for complex problems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-900/30 p-2 rounded-lg">
                    <Beaker className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Scientific Simulations</h3>
                    <p className="text-sm text-gray-400">Interactive simulations for scientific concepts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-900/30 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Higher Usage Limits</h3>
                    <p className="text-sm text-gray-400">More queries and longer conversations</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#3a3a3a] pt-4">
                <p className="text-xs text-gray-500">
                  Beta features are under active development and may change without notice.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
