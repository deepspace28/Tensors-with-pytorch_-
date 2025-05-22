"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScientificLogo } from "@/components/scientific-logo"

export default function BetaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    researchInterest: "",
    background: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)

      // Redirect after success
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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center mb-8">
          <ScientificLogo className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Synaptiq Beta Program</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-black border-gray-800 text-white">
              <CardHeader>
                <CardTitle>Join the Synaptiq Beta Program</CardTitle>
                <CardDescription className="text-gray-400">
                  Get early access to our most advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white mb-4">
                      ✓
                    </div>
                    <h2 className="text-xl font-medium mb-2">Welcome to the Beta Program!</h2>
                    <p className="text-gray-400 mb-4">
                      You now have access to all beta features. You'll be redirected to the chat shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-black border-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black border-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="bg-black border-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="bg-black border-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="researchInterest">Research Interest</Label>
                      <Input
                        id="researchInterest"
                        name="researchInterest"
                        value={formData.researchInterest}
                        onChange={handleChange}
                        className="bg-black border-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="background">Scientific Background</Label>
                      <Textarea
                        id="background"
                        name="background"
                        value={formData.background}
                        onChange={handleChange}
                        className="bg-black border-gray-800 text-white min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-white hover:bg-gray-200 text-black"
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
            <Card className="bg-black border-gray-800 text-white">
              <CardHeader>
                <CardTitle>Beta Features</CardTitle>
                <CardDescription className="text-gray-400">
                  Exclusive features available to beta members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-900 p-2 rounded-lg flex items-center justify-center w-10 h-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 8V12L15 15"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M7.5 4.5L9.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16.5 4.5L14.5 7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M18 10.5H21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 10.5H6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Advanced Reasoning</h3>
                    <p className="text-sm text-gray-400">Step-by-step reasoning for complex problems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-900 p-2 rounded-lg flex items-center justify-center w-10 h-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 2.5V7.5C10 8.05228 9.55228 8.5 9 8.5H4"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 21.5V16.5C14 15.9477 14.4477 15.5 15 15.5H20"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="2"
                        y="10.5"
                        width="8"
                        height="11"
                        rx="1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="14"
                        y="2.5"
                        width="8"
                        height="11"
                        rx="1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Scientific Simulations</h3>
                    <p className="text-sm text-gray-400">Interactive simulations for scientific concepts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-900 p-2 rounded-lg flex items-center justify-center w-10 h-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M12 17V21"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M3 12H7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M17 12H21"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.3639 5.63604L15.5355 8.46447"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.46447 15.5355L5.63604 18.3639"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.63604 5.63604L8.46447 8.46447"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.5355 15.5355L18.3639 18.3639"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Higher Usage Limits</h3>
                    <p className="text-sm text-gray-400">More queries and longer conversations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-900 p-2 rounded-lg flex items-center justify-center w-10 h-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 4.5C7 4.5 2.5 8 2.5 12C2.5 16 7 19.5 12 19.5C17 19.5 21.5 16 21.5 12C21.5 8 17 4.5 12 4.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 12C12 9.5 13 8 15 8C17 8 18 9.5 18 12C18 14.5 17 16 15 16C13 16 12 14.5 12 12Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 12C12 9.5 11 8 9 8C7 8 6 9.5 6 12C6 14.5 7 16 9 16C11 16 12 14.5 12 12Z"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path d="M7.5 8.5L16.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M16.5 8.5L7.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Quantum Experiments</h3>
                    <p className="text-sm text-gray-400">Custom quantum circuit simulations</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
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
