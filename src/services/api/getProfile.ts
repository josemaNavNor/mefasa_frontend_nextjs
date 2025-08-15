import axios from 'axios';
import Cookies from 'js-cookie';

export interface UserProfile {
  id: number;
  email: string;
  two_factor_enable?: boolean;
  // ...otros campos
}

export async function getProfile(userId: number): Promise<UserProfile | null> {
  try {
    const token = Cookies.get('access_token');
    if (!token) return null;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'}/auth/profile/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch {
    return null;
  }
}
