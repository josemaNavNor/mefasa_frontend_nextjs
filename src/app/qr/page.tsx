"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import LogoMefasa from "@/components/ui/img"

export default function QR2FA() {
  const [qrUrl, setQrUrl] = useState("");
  const [secret, setSecret] = useState("");
  const [manualKey, setManualKey] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Obtener el userId desde el token JWT guardado en la cookie
    const token = Cookies.get("access_token");
    if (token) {
      try {
        // Decodifica el JWT (sin verificar la firma)
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Ajusta la propiedad según cómo se guarda el id en el payload
        if (payload.id) {
          setUserId(payload.id.toString());
        } else if (payload.userId) {
          setUserId(payload.userId.toString());
        } else if (payload.sub) {
          setUserId(payload.sub.toString());
        }
      } catch (err) {
        // Si el token no es válido, no se asigna el userId
      }
    }
  }, []);

  const handleGenerateQR = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("access_token");
      if (!userId || !token) {
        setError("Usuario no autenticado");
        setLoading(false);
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/auth/2fa/generate/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQrUrl(res.data.qrCodeUrl);
      setSecret(res.data.secret);
      setManualKey(res.data.manualEntryKey);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al generar QR");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    setVerifying(true);
    setError("");
    try {
      const token = Cookies.get("access_token");
      if (!userId || !token || otp.length !== 6) {
        setError("Datos incompletos");
        setVerifying(false);
        return;
      }
      // Verificar el código OTP
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/auth/2fa/enable/${userId}`,
        { token: otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("¡2FA activado correctamente!");
      // Si todo sale bien, redirige a tickets
      router.push("/tickets");
    } catch (err: any) {
      setError(err.response?.data?.message || "Código inválido");
    }
    setVerifying(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center items-center mb-6">
            <LogoMefasa />
          </div>
          <CardTitle>Configura la autenticación de dos factores (2FA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Label>Presiona para generar tu código QR:</Label>
            <button onClick={handleGenerateQR} disabled={loading || !userId} className="w-full bg-blue-600 text-white py-2 rounded mt-4 disabled:opacity-50 hover:bg-blue-700 transition-colors">
              {loading ? "Generando..." : "Generar QR"}
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {qrUrl && (
              <div className="flex flex-col items-center justify-center">
                <img src={qrUrl} alt="QR 2FA" className="mx-auto my-4" />
                <div className="mt-6 w-full flex flex-col items-center">
                  <Label className="text-center w-full">Ingresa el código de 6 dígitos generado por tu app de autenticación:</Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp} className="my-4 mx-auto" >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={verifying || otp.length !== 6}
                    className="w-full bg-blue-600 text-white py-2 rounded mt-4 disabled:opacity-50 hover:bg-blue-700 transition-colors"
                  >
                    {verifying ? "Verificando..." : "Verificar código"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

