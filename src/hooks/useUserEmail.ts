import { useState, useEffect } from "react";

// Obtiene el valor de una cookie por su nombre
function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

// Obtiene el email del payload del token JWT
function getEmailFromToken(token: string): string {
  try {
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || '';
  } catch {
    return '';
  }
}

// Hook para obtener el email del usuario
export default function useUserEmail() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = getCookie('access_token');
    setUserEmail(getEmailFromToken(token));
  }, []);

  return userEmail;
}
