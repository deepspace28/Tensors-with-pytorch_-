"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface BetaSignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureAttempted?: string
}

export function BetaSignupModal({ open, onOpenChange, featureAttempted }: BetaSignupModalProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [organization, setOrganization] = useState("")
  const [role, setRole] = useState("")
  const [researchInterest, setResearchInterest] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would submit to an API endpoint
      // For demo purposes, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)

      // Redirect to beta page after successful signup
      setTimeout(() => {
        onOpenChange(false)
        router.push("/beta")
      }, 2000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-gray-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the Beta Program</DialogTitle>
          <DialogDescription className="text-gray-400">
            {featureAttempted ? `${featureAttempted} is a beta feature.` : "Get access to exclusive beta features."}
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-white text-xl">✓</div>
            <h3 className="text-lg font-medium mb-2">Thank you for signing up!</h3>
            <p className="text-gray-400">
              We've received your request to join the beta program. You'll be redirected to the beta information page.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="research-interest">Research Interest</Label>
                <Input
                  id="research-interest"
                  value={researchInterest}
                  onChange={(e) => setResearchInterest(e.target.value)}
                  className="bg-black border-gray-800 text-white"
                  required
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-transparent border-gray-800 text-white hover:bg-gray-900"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-white hover:bg-gray-200 text-black">
                {isSubmitting ? "Submitting..." : "Join Beta"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
