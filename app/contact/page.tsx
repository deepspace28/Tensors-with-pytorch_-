import type { Metadata } from "next"
import { SimplifiedContactForm } from "@/components/simplified-contact-form"

export const metadata: Metadata = {
  title: "Contact | Synaptiq",
  description: "Get in touch with the Synaptiq team for inquiries, support, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="grid gap-6 sm:gap-8 lg:gap-12 xl:gap-16 grid-cols-1 xl:grid-cols-2">
        <div className="space-y-6 lg:space-y-8 xl:space-y-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white leading-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 lg:mb-8 text-white leading-relaxed">
            Have questions about Synaptiq or interested in partnering with us? We'd love to hear from you.
          </p>

          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-900/50 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 lg:mb-3 text-white">
                General Inquiries
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                For general questions about our platform, capabilities, or services.
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-900/50 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 lg:mb-3 text-white">
                Technical Support
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                Need help with using Synaptiq? Our team is ready to assist you.
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-gray-900/50 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 lg:mb-3 text-white">
                Partnership Opportunities
              </h2>
              <p className="text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">
                Interested in integrating Synaptiq into your research or educational platform? Let's discuss how we can
                work together.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 sm:p-8 lg:p-10 xl:p-12 rounded-lg border border-gray-800 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white">
            Send Us a Message
          </h2>
          <SimplifiedContactForm />
        </div>
      </div>
    </div>
  )
}
