import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Atom, Award, BookOpen, BrainCircuit, FlaskRoundIcon as Flask, Microscope, Users } from "lucide-react"

export const metadata = {
  title: "About Synaptiq | Advanced Scientific AI",
  description: "Learn about Synaptiq's mission to accelerate scientific discovery through advanced AI models.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/Quantum Neural Web.png')] bg-cover bg-center opacity-5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Badge className="px-4 py-1 text-sm bg-white text-black" variant="outline">
                Our Mission
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Accelerating Scientific Discovery
              </h1>
              <p className="max-w-[700px] text-lg text-gray-400 md:text-xl">
                Synaptiq is dedicated to empowering researchers with advanced AI tools that push the boundaries of
                scientific knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">Our Story</h2>
                <p className="text-gray-300 mb-4">
                  Synaptiq was founded in 2021 by a team of physicists, mathematicians, and AI researchers with a shared
                  vision: to create AI systems that truly understand the language of science.
                </p>
                <p className="text-gray-300 mb-4">
                  We recognized that while general-purpose AI models were advancing rapidly, they often struggled with
                  the nuanced reasoning and specialized knowledge required for scientific research.
                </p>
                <p className="text-gray-300">
                  After three years of intensive research and development, we launched Synaptiq—an AI platform
                  specifically designed to understand, reason about, and contribute to scientific knowledge across
                  physics, mathematics, chemistry, and beyond.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image src="/thoughtful-scientist.png" alt="Synaptiq founding team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Our Core Values</h2>
              <p className="max-w-[700px] text-gray-400">
                The principles that guide our work and shape our approach to scientific AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-white/10 p-3">
                      <Microscope className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Scientific Rigor</h3>
                    <p className="text-gray-300">
                      We hold our AI to the same standards as peer-reviewed research, ensuring accuracy and reliability
                      in all outputs.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-white/10 p-3">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Open Knowledge</h3>
                    <p className="text-gray-300">
                      We believe in democratizing access to scientific knowledge and tools, making them available to
                      researchers worldwide.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-white/10 p-3">
                      <BrainCircuit className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Continuous Learning</h3>
                    <p className="text-gray-300">
                      Our models are constantly evolving, incorporating the latest scientific research and
                      methodologies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Our Team</h2>
              <p className="max-w-[700px] text-gray-400">
                A diverse group of scientists, engineers, and AI researchers united by a passion for scientific
                discovery.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image src="/confident-scientist.png" alt="Dr. Elena Patel" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Dr. Elena Patel</h3>
                  <p className="text-gray-400">Chief Scientific Officer</p>
                  <p className="text-gray-300 mt-2">
                    Quantum physicist with 15+ years of research experience at CERN and MIT.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image src="/huberman-avatar.png" alt="Dr. Marcus Chen" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Dr. Marcus Chen</h3>
                  <p className="text-gray-400">Chief Technology Officer</p>
                  <p className="text-gray-300 mt-2">
                    AI researcher and former lead at DeepMind's scientific AI division.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image src="/focused-female-scientist.png" alt="Dr. Sophia Rodriguez" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Dr. Sophia Rodriguez</h3>
                  <p className="text-gray-400">Head of Research</p>
                  <p className="text-gray-300 mt-2">
                    Computational chemist specializing in molecular dynamics and quantum chemistry.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Button asChild className="bg-white hover:bg-gray-200 text-black">
                <Link href="/team">
                  <Users className="mr-2 h-4 w-4" />
                  Meet the Full Team
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Our Achievements</h2>
              <p className="max-w-[700px] text-gray-400">
                Milestones in our journey to revolutionize scientific research with AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-white/10 p-3 mt-1">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Scientific Accuracy Award</h3>
                      <p className="text-gray-400 text-sm mb-2">2023 AI Research Summit</p>
                      <p className="text-gray-300">
                        Recognized for achieving 99.8% accuracy in mathematical proofs and quantum physics simulations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-white/10 p-3 mt-1">
                      <Flask className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Research Breakthrough</h3>
                      <p className="text-gray-400 text-sm mb-2">Published in Nature, 2022</p>
                      <p className="text-gray-300">
                        Our quantum simulation algorithm identified a novel approach to quantum error correction, now
                        implemented in leading quantum computing labs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-white/10 p-3 mt-1">
                      <Atom className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Quantum Neural Network Patent</h3>
                      <p className="text-gray-400 text-sm mb-2">2023</p>
                      <p className="text-gray-300">
                        Developed and patented a novel architecture for quantum neural networks that achieves
                        exponential speedup for certain scientific computations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-white/10 p-3 mt-1">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Research Partnerships</h3>
                      <p className="text-gray-400 text-sm mb-2">Ongoing</p>
                      <p className="text-gray-300">
                        Established collaborative research programs with 24+ leading universities and research
                        institutions worldwide.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-white">Join Our Scientific Community</h2>
              <p className="max-w-[700px] text-gray-300">
                Connect with researchers worldwide and explore the frontiers of scientific discovery with Synaptiq.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button asChild className="bg-white hover:bg-gray-200 text-black">
                  <Link href="/signup">Create an Account</Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
