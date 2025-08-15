"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function TicketsPage() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/sign_in");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-6">
      <div className="text-2xl font-bold text-blue-700">Bienvenido a la página de tickets</div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
