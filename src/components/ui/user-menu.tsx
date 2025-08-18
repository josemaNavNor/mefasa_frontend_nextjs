import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);

  return (
  <div className="relative" ref={menuRef}>
      <button
        className="flex items-center gap-2 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <Image
          src="/user.png"
          alt="Usuario"
          width={40}
          height={40}
          className="rounded-full border border-gray-300 shadow-sm transition-all duration-200 transform hover:scale-105"
        />
      </button>
      {open && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-[100]">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-semibold text-gray-900">Mi perfil</div>
            <div className="text-sm text-gray-500">usuario@mefasa.com</div>
          </div>
          <div className="flex flex-col">
            <Button variant="ghost" className="justify-start px-4 py-2 w-full text-left" onClick={() => { setOpen(false); window.location.href = '/profile'; }}>
              Ver perfil
            </Button>
            <Button variant="ghost" className="justify-start px-4 py-2 w-full text-left text-red-600" onClick={() => { setOpen(false); window.location.href = '/sign_in'; }}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
