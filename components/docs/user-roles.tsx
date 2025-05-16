import type React from "react"
import { Users, Layers, Database, GitBranch } from "lucide-react"

interface UserRoleProps {
  icon: React.ReactNode
  title: string
  description: string
}

function UserRole({ icon, title, description }: UserRoleProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-gray-300 text-sm mt-1">{description}</p>
      </div>
    </div>
  )
}

export function UserRoles() {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Who is Synaptiq For?</h3>

      <div className="space-y-6">
        <UserRole
          icon={
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
              <circle cx="12" cy="10" r="1" />
              <path d="M12 11v3" />
            </svg>
          }
          title="AI Researchers"
          description="Researchers working on symbolic AI, knowledge representation, and reasoning who need to model complex scientific domains and test novel approaches to scientific AI."
        />

        <UserRole
          icon={<Users className="h-6 w-6 text-white" />}
          title="Theoretical Physicists"
          description="Scientists exploring new hypotheses in quantum mechanics, astrophysics, and related fields who need computational tools to formalize theories and generate predictions."
        />

        <UserRole
          icon={<GitBranch className="h-6 w-6 text-white" />}
          title="Plugin Developers"
          description="Developers creating specialized tools for scientific domains who want to integrate with a platform that provides powerful reasoning and theory-building capabilities."
        />

        <UserRole
          icon={<Database className="h-6 w-6 text-white" />}
          title="Data Providers"
          description="Organizations with scientific datasets who want to enable AI-powered analysis and hypothesis generation based on their data."
        />

        <UserRole
          icon={<Layers className="h-6 w-6 text-white" />}
          title="Interdisciplinary Research Teams"
          description="Teams bridging multiple scientific domains who need tools to identify potential connections between fields and generate cross-disciplinary hypotheses."
        />
      </div>
    </div>
  )
}
