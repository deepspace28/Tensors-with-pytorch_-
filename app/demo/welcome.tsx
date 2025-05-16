"use client"

import { ScientificLogo } from "@/components/scientific-logo"
import { Button } from "@/components/ui/button"

interface WelcomeProps {
  onNewChat: () => void
}

export function Welcome({ onNewChat }: WelcomeProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <ScientificLogo className="h-16 w-16 mx-auto mb-4 text-emerald-500" />
        <h2 className="text-2xl font-bold mb-2">Welcome to Synaptiq</h2>
        <p className="text-gray-400 max-w-md">
          The advanced scientific AI assistant developed by Jishnav and the Synaptiq team.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-[#1a1a1a] p-4 rounded-lg text-left">
            <h3 className="font-medium mb-2">Quantum Physics</h3>
            <p className="text-sm text-gray-400 mb-3">
              Explore quantum mechanics, entanglement, and wave-particle duality
            </p>
            <Button variant="outline" className="w-full border-[#333] hover:bg-[#2a2a2a]" onClick={() => onNewChat()}>
              Ask about quantum physics
            </Button>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg text-left">
            <h3 className="font-medium mb-2">Mathematical Proofs</h3>
            <p className="text-sm text-gray-400 mb-3">Get help with complex mathematical proofs and derivations</p>
            <Button variant="outline" className="w-full border-[#333] hover:bg-[#2a2a2a]" onClick={() => onNewChat()}>
              Solve a math problem
            </Button>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg text-left">
            <h3 className="font-medium mb-2">Scientific Research</h3>
            <p className="text-sm text-gray-400 mb-3">
              Get assistance with research methodologies and literature reviews
            </p>
            <Button variant="outline" className="w-full border-[#333] hover:bg-[#2a2a2a]" onClick={() => onNewChat()}>
              Research assistance
            </Button>
          </div>
          <div className="bg-[#1a1a1a] p-4 rounded-lg text-left">
            <h3 className="font-medium mb-2">Experimental Design</h3>
            <p className="text-sm text-gray-400 mb-3">Design and analyze scientific experiments across disciplines</p>
            <Button variant="outline" className="w-full border-[#333] hover:bg-[#2a2a2a]" onClick={() => onNewChat()}>
              Design an experiment
            </Button>
          </div>
        </div>
        <Button onClick={onNewChat} className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white">
          Start a new conversation
        </Button>
      </div>
    </div>
  )
}
