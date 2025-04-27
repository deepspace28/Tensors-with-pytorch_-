import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DemoChat } from "@/components/demo-chat" // <-- Use existing DemoChat component

export const metadata = {
  title: "Synaptiq AI Assistant",
  description: "Interact live with Synaptiq's scientific AI model.",
}

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Welcome to Synaptiq
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:text-xl">
              Ask scientific questions and receive live, research-grade responses from our advanced AI assistant.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <DemoChat /> {/* Use the existing DemoChat component */}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
