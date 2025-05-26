import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Synaptiq",
  description: "Privacy Policy for Synaptiq - Advanced Scientific AI Platform",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Create an account or use our services</li>
              <li>Submit scientific queries or simulations</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3 text-white">Types of Information:</h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>Personal Information:</strong> Name, email address, institutional affiliation
              </li>
              <li>
                <strong>Usage Data:</strong> Queries, simulation parameters, interaction patterns
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, device information
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process scientific simulations and generate results</li>
              <li>Communicate with you about your account and our services</li>
              <li>Develop new features and enhance user experience</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Service Providers:</strong> Trusted partners who assist in operating our platform
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers or acquisitions
              </li>
              <li>
                <strong>Consent:</strong> When you explicitly agree to sharing
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure data centers and infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the
              purposes outlined in this policy. Scientific simulation data may be retained longer for research and
              development purposes, but will be anonymized when possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Access:</strong> Request access to your personal information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data
              </li>
              <li>
                <strong>Objection:</strong> Object to certain processing activities
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve
              our services. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information during such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibent mb-4 text-white">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-4">
              <p>
                Email:{" "}
                <a href="mailto:privacy@synaptiq.contact" className="text-blue-400 hover:text-blue-300">
                  privacy@synaptiq.contact
                </a>
              </p>
              <p>Address: Synaptiq Labs Privacy Office</p>
            </div>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
