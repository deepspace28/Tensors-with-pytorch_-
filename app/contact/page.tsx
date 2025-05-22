import type { Metadata } from "next"
import { Mail, MessageSquare, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SimplifiedContactForm } from "@/components/simplified-contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Synaptiq",
  description: "Get in touch with the Synaptiq team for support, partnerships, or general inquiries.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Have questions about Synaptiq? Want to partner with us? Or just want to say hello? We'd love to hear from
              you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Support Inquiries</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Need help with your account or have technical questions? Our support team is ready to assist.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Partnerships</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Interested in partnering with Synaptiq? Let's explore how we can work together.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Research Collaboration</h3>
                <p className="text-sm text-gray-600 mt-1">
                  For academic or research inquiries, our scientific team would be happy to discuss potential
                  collaborations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <SimplifiedContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
