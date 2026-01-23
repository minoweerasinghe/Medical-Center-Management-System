import { MedicalHeader } from "@/components/medical-header"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <MedicalHeader variant="login" />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex flex-col items-center">

          {/* WELCOME TITLE */}
          <h1 className="text-4xl font-bold text-foreground mb-6 text-center">
            Welcome to MEDiCAL CENTRE!
          </h1>

          {/* IMAGE SECTION */}
          <div className="w-full h-60 md:h-100 rounded-lg overflow-hidden mb-10">
            <img
              src="/login.png"
              alt="Medical Centre Building"
              className="w-full h-full object-cover"
            />
          </div>

          {/* LOGIN FORM */}
          <LoginForm />

        </div>
      </main>
    </div>
  )
}
