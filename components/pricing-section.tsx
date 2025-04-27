import Link from "next/link"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
        "relative rounded-lg border bg-card/60 backdrop-blur-sm p-6 shadow-md transition-all duration-300 hover:shadow-lg",
        gradient &&
          "border-0 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-br before:from-primary/30 before:to-secondary/30 before:content-['']",
        popular && "border-primary/30 shadow-md shadow-primary/10",
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
        <Button
          asChild
          className={cn(
            "w-full",
            gradient && "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  )
}

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1">
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the plan that best fits your research needs, from individual researchers to large institutions.
            </p>
          </div>
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
      </div>
    </section>
  )
}
