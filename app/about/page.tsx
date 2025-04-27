import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, BrainCircuit, GraduationCap, Microscope, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata = {
  title: "About Us",
  description: "Learn about the Synaptiq team and our mission to advance scientific research through AI.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Our Mission</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Synaptiq is dedicated to accelerating scientific discovery through advanced AI models specifically
                  designed for researchers, physicists, mathematicians, and scientific institutions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild>
                  <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Read Documentation</Link>
                </Button>
              </div>
            </div>
            <Image
              src="/cosmic-flow.png"
              width={550}
              height={550}
              alt="Abstract scientific visualization"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Our Values</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              The principles that guide our work and innovation.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-12">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Microscope className="h-5 w-5 text-primary" />
                <CardTitle>Scientific Rigor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We uphold the highest standards of scientific accuracy and validation in all our models and tools.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We continuously push the boundaries of what's possible in scientific AI and quantum simulations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Open Science</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We believe in transparency and collaboration to advance scientific knowledge collectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Our Team</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Meet the experts behind Synaptiq's groundbreaking technology.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/huberman-avatar.png"
                width={200}
                height={200}
                alt="Dr. Michael Chen"
                className="rounded-full object-cover"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Dr. Michael Chen</h3>
                <p className="text-sm text-muted-foreground">Chief Scientific Officer</p>
                <p className="text-sm">
                  Former quantum physicist at CERN with over 15 years of experience in quantum computing and AI.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/focused-female-scientist.png"
                width={200}
                height={200}
                alt="Dr. Sarah Johnson"
                className="rounded-full object-cover"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Dr. Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Lead AI Researcher</p>
                <p className="text-sm">
                  Specialist in mathematical modeling and neural networks with publications in Nature and Science.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/confident-tech-leader.png"
                width={200}
                height={200}
                alt="David Rodriguez"
                className="rounded-full object-cover"
              />
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">David Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                <p className="text-sm">
                  Former engineering leader at Google AI with expertise in scalable AI systems and infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">Our Achievements</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Milestones that mark our journey in advancing scientific AI.
            </p>
          </div>
          <div className="mx-auto max-w-3xl mt-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Best Scientific AI Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    Awarded by the International Association for AI in Science, 2023
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">10,000+ Researchers</h3>
                  <p className="text-sm text-muted-foreground">Active users from top research institutions worldwide</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Research Partnerships</h3>
                  <p className="text-sm text-muted-foreground">Collaborations with MIT, Stanford, Oxford, and CERN</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
