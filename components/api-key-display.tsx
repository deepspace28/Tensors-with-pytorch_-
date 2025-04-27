"use client"

import { useState } from "react"
import { Copy, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function ApiKeyDisplay() {
  const [showApiKey, setShowApiKey] = useState(false)
  const apiKey = "sk_synaptiq_1234567890abcdefghijklmnopqrstuvwxyz"
  const maskedApiKey = "sk_synaptiq_•••••••••••••••••••••••••••••••••"

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey)
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API key copied",
      description: "Your API key has been copied to the clipboard.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Primary API Key</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleApiKeyVisibility}
              aria-label={showApiKey ? "Hide API key" : "Show API key"}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={copyApiKey} aria-label="Copy API key">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input value={showApiKey ? apiKey : maskedApiKey} readOnly className="font-mono" />
        </div>
        <p className="text-xs text-muted-foreground">Created on April 15, 2023. Last used 2 days ago.</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Secondary API Key</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled aria-label="Show API key">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled aria-label="Copy API key">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input value="No secondary API key generated" readOnly disabled className="font-mono" />
        </div>
      </div>
    </div>
  )
}
