import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactSuccessPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-md mx-auto border-green-200 shadow-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">Message Sent Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for contacting Synaptiq. We have received your message and will get back to you as soon as
            possible.
          </p>
          <p className="text-sm text-gray-500">Our team typically responds within 24-48 hours during business days.</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 pt-2">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Back to Contact</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
