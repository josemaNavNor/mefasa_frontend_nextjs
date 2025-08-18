import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className={cn("w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50")}> 
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="font-bold text-lg text-primary">MEFASA</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/tickets">
          <Button variant="ghost">Tickets</Button>
        </Link>
        <Link href="/qr">
          <Button variant="ghost">QR</Button>
        </Link>
        <Link href="/sign_in">
          <Button variant="ghost">Iniciar sesión</Button>
        </Link>
        <Link href="/sign_up">
          <Button variant="ghost">Registrarse</Button>
        </Link>
      </div>
    </nav>
  );
}
