import { MedicalHeader } from "@/components/medical-header"
import { ResetPasswordForm } from "@/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-background">
      <MedicalHeader variant="login" />
      <div className="container mx-auto px-4 py-16">
        <ResetPasswordForm />
      </div>
    </main>
  )
}
