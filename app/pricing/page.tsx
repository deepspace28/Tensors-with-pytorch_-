import Link from "next/link"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "Pricing",
  description: "Choose the right plan for your scientific research needs.",
}

interface PricingProps {
  title: string
  description: string
  price: string
  duration: string
  popular?: boolean
  features: string[]
  buttonText: string
  buttonLink: string
  gradient?: boolean
}

function PricingCard({
  title,
  description,
  price,
  duration,
  popular,
  features,
  buttonText,
  buttonLink,
  gradient,
}: PricingProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card p-6 shadow-sm",
        gradient &&
          "border-0 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-br before:from-primary/50 before:to-secondary/50 before:content-['']",
        popular && "border-primary/50 shadow-md",
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Popular
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-sm font-medium text-muted-foreground">{duration}</span>
        </div>
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link
          href={buttonLink}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full",
            gradient && "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Flexible Plans for Every Research Need
            </h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 md:text-xl">
              Choose the plan that works best for your research requirements, from individual researchers to large
              institutions.
            </p>
          </div>
          <div className="mx-auto grid max-w-screen-lg gap-4 py-8 md:grid-cols-3 lg:gap-8">
            <PricingCard
              title="Individual"
              description="For individual researchers and students"
              price="$49"
              duration="/month"
              features={[
                "Access to core scientific LLM",
                "Basic quantum simulations",
                "5,000 API calls per month",
                "Community support",
                "Standard documentation",
              ]}
              buttonText="Get Started"
              buttonLink="/signup?plan=individual"
            />
            <PricingCard
              title="Research Team"
              description="For research groups and small labs"
              price="$199"
              duration="/month"
              popular={true}
              features={[
                "Access to advanced scientific LLM",
                "Full quantum simulation capabilities",
                "25,000 API calls per month",
                "Priority email support",
                "Advanced documentation",
                "Team collaboration features",
                "Custom model fine-tuning",
              ]}
              buttonText="Start Free Trial"
              buttonLink="/signup?plan=research"
              gradient={true}
            />
            <PricingCard
              title="Institution"
              description="For universities and research institutions"
              price="$999"
              duration="/month"
              features={[
                "Access to all scientific LLM capabilities",
                "Unlimited quantum simulations",
                "100,000 API calls per month",
                "Dedicated support manager",
                "Custom integration support",
                "Enterprise-grade security",
                "On-premise deployment options",
                "Custom model development",
              ]}
              buttonText="Contact Sales"
              buttonLink="/contact"
            />
          </div>
          <div className="mx-auto mt-12 max-w-[58rem] text-center">
            <h2 className="text-2xl font-bold">Need a custom solution?</h2>
            <p className="mt-2 text-muted-foreground">
              Contact our sales team to discuss custom pricing options for your specific research needs.
            </p>
            <div className="mt-4">
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mx-auto")}>
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
