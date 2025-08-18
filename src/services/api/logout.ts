import Cookies from 'js-cookie';

// Funcion para cerrar sesion, se eliminan las cookies
export function logout() {
  Cookies.remove('access_token');
}
