import { AtSign, Building, MessageSquare, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the Synaptiq team for inquiries, support, or partnership opportunities.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Have questions about our scientific LLM platform? Our team is here to help you find the right solution
                  for your research needs.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <AtSign className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-sm text-muted-foreground">info@synaptiq.contact</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Building className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-bold">Headquarters</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Science Park
                      <br />
                      Cambridge, MA 02142
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Find answers to common questions about Synaptiq.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 py-8 md:grid-cols-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>What scientific fields does Synaptiq support?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Synaptiq supports a wide range of scientific fields including physics, mathematics, chemistry,
                  biology, and computer science. Our models are trained on extensive scientific literature and can
                  assist with research in these domains.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>How accurate are the quantum simulations?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our quantum simulations achieve 99.8% accuracy on benchmark tests and have been validated by leading
                  researchers in the field. We continuously improve our models based on the latest research and feedback
                  from our users.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Can I integrate Synaptiq with my existing tools?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, Synaptiq offers comprehensive API access that allows integration with popular scientific tools
                  and platforms. Our documentation provides detailed guides for integration with Python, MATLAB, R, and
                  other common research environments.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Is my research data secure with Synaptiq?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Absolutely. We implement enterprise-grade security measures to protect your data. We do not use your
                  research data to train our models without explicit permission, and we offer data residency options for
                  institutions with specific compliance requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
