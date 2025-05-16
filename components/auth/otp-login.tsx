"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function OTPLogin() {
  const { authState, requestOTP, verifyOTP, isLoading, error } = useAuth()
  const [email, setEmail] = useState(authState.email || "")
  const [code, setCode] = useState("")

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    await requestOTP(email)
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    await verifyOTP(email, code)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In to Synaptiq</CardTitle>
        <CardDescription>
          {authState.step === "verifyingOTP"
            ? "Enter the verification code sent to your email"
            : "Enter your email to receive a verification code"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {authState.step === "verifyingOTP" ? (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                className="bg-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="text-center text-xl tracking-widest"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRequestOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending code...
                </>
              ) : (
                <>
                  Send Verification Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500">
        {authState.step === "verifyingOTP" ? (
          <Button variant="link" onClick={() => requestOTP(email)} disabled={isLoading}>
            Didn't receive a code? Send again
          </Button>
        ) : (
          <p>We'll send a 6-digit code to your email</p>
        )}
      </CardFooter>
    </Card>
  )
}
