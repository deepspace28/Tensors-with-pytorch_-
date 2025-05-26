import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy - Synaptiq",
  description: "Cookie Policy for Synaptiq - Advanced Scientific AI Platform",
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-white">Cookie Policy</h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit our website.
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Cookies</h2>
            <p>We use cookies for several purposes:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Remember your preferences and settings
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Collect information about website usage
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3 text-white">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function and cannot be switched off:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Authentication cookies (keep you logged in)</li>
                  <li>Security cookies (protect against fraud)</li>
                  <li>Session cookies (maintain your session state)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3 text-white">Performance Cookies</h3>
                <p>These cookies help us improve our website performance:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Page load time measurement</li>
                  <li>Error tracking and reporting</li>
                  <li>Feature usage analytics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3 text-white">Functionality Cookies</h3>
                <p>These cookies enhance your user experience:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Theme preferences (dark/light mode)</li>
                  <li>Language settings</li>
                  <li>Simulation parameters</li>
                  <li>Chat conversation history</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3 text-white">Analytics Cookies</h3>
                <p>These cookies help us understand website usage:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Google Analytics (anonymized data)</li>
                  <li>User journey tracking</li>
                  <li>Feature adoption metrics</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Third-Party Cookies</h2>
            <p>We may use third-party services that set their own cookies:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Google Analytics:</strong> Website analytics and performance monitoring
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Performance and usage analytics
              </li>
              <li>
                <strong>CDN Services:</strong> Content delivery and caching
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Managing Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>

            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-white">Browser Settings</h3>
                <p>Most browsers allow you to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>View and delete cookies</li>
                  <li>Block cookies from specific sites</li>
                  <li>Block third-party cookies</li>
                  <li>Clear all cookies when you close the browser</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-white">Browser-Specific Instructions</h3>
                <ul className="list-disc pl-6">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Cookie Consent</h2>
            <p>
              When you first visit our website, we will ask for your consent to use non-essential cookies. You can
              withdraw your consent at any time by adjusting your browser settings or contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Impact of Disabling Cookies</h2>
            <p>If you disable cookies, some features of our website may not work properly:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>You may need to log in repeatedly</li>
              <li>Your preferences may not be saved</li>
              <li>Some interactive features may not function</li>
              <li>We may not be able to provide personalized experiences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other
              operational, legal, or regulatory reasons. Please check this page periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us at:</p>
            <div className="mt-4">
              <p>
                Email:{" "}
                <a href="mailto:privacy@synaptiq.contact" className="text-blue-400 hover:text-blue-300">
                  privacy@synaptiq.contact
                </a>
              </p>
              <p>Subject: Cookie Policy Inquiry</p>
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
