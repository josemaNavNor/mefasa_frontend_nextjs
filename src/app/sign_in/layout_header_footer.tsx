'use client'
import LogoMefasa from "@/components/ui/img"
import { CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LayoutHeader() {
    return (
        <CardHeader>
            <div className="flex justify-center items-center mb-6">
                <LogoMefasa />
            </div>
            <CardTitle>Inicia sesion a tu cuenta</CardTitle>
            <CardDescription>
                Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta
            </CardDescription>
        </CardHeader>
    )
}

export function LayoutFooter() {
    return (
        <CardFooter className="flex-col gap-2">
            <Link href="/sign_up" className="w-full">
                <Button variant="link" className="w-full" asChild>
                    <span>¿No tienes una cuenta? Regístrate</span>
                </Button>
            </Link>
        </CardFooter>
    )
}