import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BetaAccessForm } from "@/components/beta-access-form"

export const metadata = {
  title: "Request Beta Access",
  description: "Join the Synaptiq beta program and be among the first to use our scientific AI platform.",
}

export default function BetaAccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Request Beta Access
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:text-xl">
              Join our exclusive beta program and be among the first researchers to leverage the power of Synaptiq.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <BetaAccessForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
