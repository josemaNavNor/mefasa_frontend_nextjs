import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignUpForm from "./sign_up_form"


export default function CardDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Crea una cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico a continuación para registrarte
          </CardDescription>
          <CardAction>
            <Button variant="link">Iniciar sesión</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}