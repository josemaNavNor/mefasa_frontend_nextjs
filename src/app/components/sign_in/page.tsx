import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LogoMefasa from "@/components/ui/img"

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <div className="flex justify-center items-center mb-6">
                        <LogoMefasa />
                    </div>
                    <CardTitle>Inicia sesion a tu cuenta</CardTitle>
                    <CardDescription>
                        Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Iniciar sesión
                    </Button>
                    <Link href="/components/sign_up" className="w-full">
                        <Button variant="link" className="w-full" asChild>
                            <span>¿No tienes una cuenta? Regístrate</span>
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>

    )
}
