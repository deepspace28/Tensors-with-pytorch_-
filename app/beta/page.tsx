import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Beta Application Status - Synaptiq",
  description: "Check the status of your Synaptiq Beta Program application",
}

export default function BetaPage() {
  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Beta Application Status</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
          Thank you for your interest in joining our beta program. Here's the status of your application.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <Card className="border-green-500 dark:border-green-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Application Submitted
            </CardTitle>
            <CardDescription>Your beta application has been received</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              We've received your request to join the Synaptiq Beta Program. Our team will review your application and
              determine eligibility based on our current capacity and your use case.
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-500 dark:border-amber-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Under Review
            </CardTitle>
            <CardDescription>Application review process</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Applications are typically reviewed within 3-5 business days. We'll notify you via email once your
              application has been processed with next steps to access the beta features.
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500 dark:border-purple-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-purple-500" />
              Next Steps
            </CardTitle>
            <CardDescription>What happens after approval</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              If approved, you'll receive an email with instructions on how to access beta features. You'll also get
              information about providing feedback and reporting any issues you encounter.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">Beta Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Semantic search capabilities across scientific literature and datasets.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Scientific Reasoning</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enhanced reasoning capabilities for complex scientific problems.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Quantum Simulations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Run quantum circuit simulations and visualize results directly in chat.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
        <p className="mb-6">If you have any questions about your beta application, please contact our support team.</p>
        <Link href="/contact">
          <Button size="lg">Contact Support</Button>
        </Link>
      </div>
    </div>
  )
}
