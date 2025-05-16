import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Access & Authentication | Synaptiq Internal Documentation",
  description: "Authentication and access control for the Synaptiq platform.",
}

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8">
            <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Link href="/docs/internal" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Documentation
              </Link>
            </Button>
          </div>

          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-white mb-6">Access & Authentication</h1>

            <div className="bg-black border border-gray-800 rounded-lg p-6 mb-8">
              <blockquote className="border-l-4 border-white pl-4 italic text-gray-300">
                Guidelines for API access, key provisioning, and role-based authentication.
              </blockquote>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Internal Access Policies</h2>
            <p className="text-gray-300">
              Access to Synaptiq is strictly controlled and limited to authorized personnel within the organization. All
              access is governed by the principle of least privilege, ensuring that users have only the permissions
              necessary to perform their specific job functions.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Access Tiers</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-gray-300 mt-4">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-4 text-white">Tier</th>
                    <th className="text-left py-2 px-4 text-white">Description</th>
                    <th className="text-left py-2 px-4 text-white">Eligible Roles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Tier 1: Read-Only</td>
                    <td className="py-2 px-4">Can view theories and results but cannot modify or create</td>
                    <td className="py-2 px-4">Researchers, Analysts, Product Managers</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Tier 2: Interactive</td>
                    <td className="py-2 px-4">Can generate theories and provide feedback</td>
                    <td className="py-2 px-4">Senior Researchers, Domain Experts</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 px-4">Tier 3: Administrative</td>
                    <td className="py-2 px-4">Full system access including configuration changes</td>
                    <td className="py-2 px-4">System Administrators, Lead Engineers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Generating and Managing API Keys</h2>
            <p className="text-gray-300">
              API keys are the primary method for authenticating with the Synaptiq API. Each key is associated with a
              specific user and access tier, and all API requests must include a valid key.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Key Generation Process</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4">
              <li>Submit a key request through the internal portal with justification</li>
              <li>Request is reviewed by the security team</li>
              <li>Upon approval, a key is generated with appropriate scopes</li>
              <li>Key is securely delivered to the requestor</li>
            </ol>

            <div className="bg-gray-900 p-4 rounded-md mt-4">
              <h4 className="text-white font-mono mb-2">Example API Key Format</h4>
              <code className="text-green-400 font-mono">syn_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code>
              <p className="text-gray-400 mt-2 text-sm">
                Keys are 64 characters long and prefixed with "syn_api_" to distinguish them from other system keys.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">User Roles and Permission Layers</h2>
            <p className="text-gray-300">
              Beyond the basic access tiers, Synaptiq implements a fine-grained permission system that allows for
              precise control over what actions users can perform within the system.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Core Permissions</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>
                <strong className="text-white">theory:read</strong> - View existing theories
              </li>
              <li>
                <strong className="text-white">theory:create</strong> - Generate new theories
              </li>
              <li>
                <strong className="text-white">theory:evaluate</strong> - Run evaluation on theories
              </li>
              <li>
                <strong className="text-white">theory:modify</strong> - Edit or refine theories
              </li>
              <li>
                <strong className="text-white">system:configure</strong> - Modify system parameters
              </li>
              <li>
                <strong className="text-white">admin:users</strong> - Manage user access
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Key Rotation and Revocation Workflows</h2>
            <p className="text-gray-300">
              To maintain security, API keys must be regularly rotated and promptly revoked when no longer needed.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Rotation Schedule</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Standard keys: Rotated every 90 days</li>
              <li>Administrative keys: Rotated every 30 days</li>
              <li>Emergency access keys: Rotated after each use</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">Revocation Triggers</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Employee role change or departure</li>
              <li>Suspected key compromise</li>
              <li>Unusual access patterns detected</li>
              <li>Project completion</li>
            </ul>

            <div className="bg-black border border-gray-800 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Security Best Practices</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Never share API keys between users</li>
                <li>Store keys in secure credential storage, never in code repositories</li>
                <li>Use environment variables for key storage in applications</li>
                <li>Implement key usage monitoring and alerting</li>
                <li>Regularly audit key access and usage patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
