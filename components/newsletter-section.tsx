"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

interface NewsletterSectionProps {
  onJoinBeta?: () => void
}

export function NewsletterSection({ onJoinBeta }: NewsletterSectionProps) {
  return (
    <section className="container px-4 py-8 sm:py-12 md:py-16 lg:py-12 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl text-center"
      >
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 sm:p-8 lg:p-6 border border-primary/20">
          <Badge
            className="px-3 py-1 text-xs sm:px-4 sm:text-sm lg:px-3 lg:text-xs mb-4 sm:mb-6 lg:mb-4"
            variant="secondary"
          >
            Join the Revolution
          </Badge>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-3xl mb-4 sm:mb-6 lg:mb-4">
            Ready to Transform Your Research?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-base text-muted-foreground mb-6 sm:mb-8 lg:mb-6 leading-relaxed max-w-3xl mx-auto">
            Join thousands of researchers who are already using Synaptiq to accelerate their discoveries. Get early
            access to our beta platform and be part of the future of scientific research.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-3 justify-center items-center max-w-md mx-auto">
            <Button
              size="lg"
              onClick={onJoinBeta}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg lg:text-base px-6 sm:px-8 lg:px-6 py-3 sm:py-4 lg:py-3 h-auto min-h-[48px] lg:min-h-[44px] font-semibold transition-all duration-300 hover:scale-105"
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
              Request Beta Access
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-6 text-xs sm:text-sm lg:text-xs text-muted-foreground">
            <p>Join 10,000+ researchers already on the waitlist</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
