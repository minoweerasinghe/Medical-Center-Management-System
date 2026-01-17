import { MedicalHeader } from "@/components/medical-header"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <MedicalHeader variant="login" />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex flex-col items-center">
          <img
            src="/login.png"
            alt="Medical Centre Building"
            className="w-full max-w-200xl rounded-lg mb-10"
          />

          <h1 className="text-4xl font-bold text-foreground mb-8">Welcome to MEDiCAL CENTRE</h1>

          <LoginForm />
        </div>
      </main>
    </div>
  )
}
