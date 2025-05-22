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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface BetaSignupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureAttempted?: string
}

export function BetaSignupModal({ open, onOpenChange, featureAttempted }: BetaSignupModalProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [institution, setInstitution] = useState("")
  const [role, setRole] = useState("")
  const [researchArea, setResearchArea] = useState("")
  const [reason, setReason] = useState("")
  const [referralSource, setReferralSource] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [specificInterests, setSpecificInterests] = useState<string[]>([])
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions to proceed.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // In a real app, this would submit to an API endpoint
      // For demo purposes, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)

      // Redirect to beta page after a delay
      setTimeout(() => {
        onOpenChange(false)
        router.push("/beta")
      }, 3000)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestToggle = (interest: string) => {
    setSpecificInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Join the Beta Program</DialogTitle>
          <DialogDescription className="text-gray-400">
            {featureAttempted ? `${featureAttempted} is a beta feature.` : "Get access to exclusive beta features."}
          </DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-green-400 text-xl">✓</div>
            <h3 className="text-lg font-medium mb-2">Thank you for your interest!</h3>
            <p className="text-gray-400">
              We've received your request to join the beta program. Our team will review your application and reach out
              to you soon with next steps.
            </p>
            <p className="text-gray-400 mt-2">Redirecting you to the beta information page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#1a1a1a] border-[#3a3a3a] text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1a1a1a] border-[#3a3a3a] text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="institution">Institution/Organization</Label>
                <Input
                  id="institution"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="bg-[#1a1a1a] border-[#3a3a3a] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role/Position</Label>
                <Input
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[#1a1a1a] border-[#3a3a3a] text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="researchArea">Primary Field of Interest *</Label>
                <Select value={researchArea} onValueChange={setResearchArea} required>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white">
                    <SelectValue placeholder="Select your field" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectItem value="quantum-physics">Quantum Physics</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Specific Areas of Interest (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="quantum-simulation"
                      checked={specificInterests.includes("quantum-simulation")}
                      onCheckedChange={() => handleInterestToggle("quantum-simulation")}
                      className="border-gray-500"
                    />
                    <label htmlFor="quantum-simulation" className="text-sm">
                      Quantum Simulation
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mathematical-modeling"
                      checked={specificInterests.includes("mathematical-modeling")}
                      onCheckedChange={() => handleInterestToggle("mathematical-modeling")}
                      className="border-gray-500"
                    />
                    <label htmlFor="mathematical-modeling" className="text-sm">
                      Mathematical Modeling
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="scientific-research"
                      checked={specificInterests.includes("scientific-research")}
                      onCheckedChange={() => handleInterestToggle("scientific-research")}
                      className="border-gray-500"
                    />
                    <label htmlFor="scientific-research" className="text-sm">
                      Scientific Research
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="data-analysis"
                      checked={specificInterests.includes("data-analysis")}
                      onCheckedChange={() => handleInterestToggle("data-analysis")}
                      className="border-gray-500"
                    />
                    <label htmlFor="data-analysis" className="text-sm">
                      Data Analysis
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="api-integration"
                      checked={specificInterests.includes("api-integration")}
                      onCheckedChange={() => handleInterestToggle("api-integration")}
                      className="border-gray-500"
                    />
                    <label htmlFor="api-integration" className="text-sm">
                      API Integration
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="education"
                      checked={specificInterests.includes("education")}
                      onCheckedChange={() => handleInterestToggle("education")}
                      className="border-gray-500"
                    />
                    <label htmlFor="education" className="text-sm">
                      Education
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Experience Level with Scientific Computing</Label>
                <RadioGroup
                  value={experienceLevel}
                  onValueChange={setExperienceLevel}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" className="border-gray-500" />
                    <Label htmlFor="beginner" className="text-sm font-normal">
                      Beginner
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" className="border-gray-500" />
                    <Label htmlFor="intermediate" className="text-sm font-normal">
                      Intermediate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" className="border-gray-500" />
                    <Label htmlFor="advanced" className="text-sm font-normal">
                      Advanced
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" className="border-gray-500" />
                    <Label htmlFor="expert" className="text-sm font-normal">
                      Expert
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reason">Why are you interested in Synaptiq? *</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-[#1a1a1a] border-[#3a3a3a] text-white min-h-[80px]"
                  placeholder="Please describe your interest in our platform and how you plan to use it"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="referralSource">How did you hear about us?</Label>
                <Select value={referralSource} onValueChange={setReferralSource}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="colleague">Colleague/Friend</SelectItem>
                    <SelectItem value="conference">Conference/Event</SelectItem>
                    <SelectItem value="publication">Academic Publication</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                  className="border-gray-500"
                  required
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-purple-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-transparent border-[#3a3a3a] text-white hover:bg-[#3a3a3a]"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white">
                {isSubmitting ? "Submitting..." : "Request Access"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
