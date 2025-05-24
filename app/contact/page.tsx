import type { Metadata } from "next"
import { SimplifiedContactForm } from "@/components/simplified-contact-form"

export const metadata: Metadata = {
  title: "Contact | Synaptiq",
  description: "Get in touch with the Synaptiq team for inquiries, support, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">Contact Us</h1>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-white leading-relaxed">
            Have questions about Synaptiq or interested in partnering with us? We'd love to hear from you.
          </p>

          <div className="space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">General Inquiries</h2>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                For general questions about our platform, capabilities, or services.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">Technical Support</h2>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Need help with using Synaptiq? Our team is ready to assist you.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-gray-900/50 rounded-lg border border-gray-800">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">Partnership Opportunities</h2>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Interested in integrating Synaptiq into your research or educational platform? Let's discuss how we can
                work together.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 sm:p-8 rounded-lg border border-gray-800">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Send Us a Message</h2>
          <SimplifiedContactForm />
        </div>
      </div>
    </div>
  )
}
