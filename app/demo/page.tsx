import { redirect } from "next/navigation"

export default function DemoPage() {
  // Redirect to the main chat page
  redirect("/chat")
}
