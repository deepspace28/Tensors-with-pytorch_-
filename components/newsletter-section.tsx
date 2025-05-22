"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterSectionProps {
  onJoinBeta?: () => void
}

export function NewsletterSection({ onJoinBeta }: NewsletterSectionProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API endpoint
    setSubscribed(true)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
              Stay Updated on Our Progress
            </h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our newsletter to receive updates on new features, research insights, and beta access opportunities.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            {subscribed ? (
              <div className="rounded-lg border border-gray-800 bg-gray-950 px-3 py-2 text-center text-sm text-gray-200">
                Thank you for subscribing!
              </div>
            ) : (
              <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                <Input
                  className="max-w-lg flex-1 bg-gray-950 border-gray-800 text-white"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  Subscribe
                </Button>
              </form>
            )}
            <p className="text-xs text-gray-500">
              Or get early access to our beta features.{" "}
              <button
                className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
                onClick={onJoinBeta}
              >
                Join the beta program
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
