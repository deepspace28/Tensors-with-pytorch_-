import type { Metadata } from "next"
import { SimplifiedContactForm } from "@/components/simplified-contact-form"

export const metadata: Metadata = {
  title: "Contact | Synaptiq",
  description: "Get in touch with the Synaptiq team for inquiries, support, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-white">Contact Us</h1>
          <p className="text-lg mb-6 text-white">
            Have questions about Synaptiq or interested in partnering with us? We'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">General Inquiries</h2>
              <p className="text-white">For general questions about our platform, capabilities, or services.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Technical Support</h2>
              <p className="text-white">Need help with using Synaptiq? Our team is ready to assist you.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">Partnership Opportunities</h2>
              <p className="text-white">
                Interested in integrating Synaptiq into your research or educational platform? Let's discuss how we can
                work together.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
          <SimplifiedContactForm />
        </div>
      </div>
    </div>
  )
}
