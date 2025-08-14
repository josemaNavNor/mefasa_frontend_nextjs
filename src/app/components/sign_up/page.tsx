import { Card, CardContent, CardDescription, CardHeader,CardTitle } from "@/components/ui/card"
import SignUpForm from "./sign_up_form"
import LogoMefasa from "@/components/ui/img"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-6">
            <LogoMefasa />
          </div>
          <CardTitle>Crea una cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico a continuación para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  )
}