import OTPLogin from "@/components/OTPLogin"

export default function LoginPage() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign In to Synaptiq</h1>
        <OTPLogin />
      </div>
    </div>
  )
}
