import api from '@configs/axios';
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from '@configs/api-endpoints';

export const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true,
    roleCode: string = 'USER'
): Promise<{ access_token: string; refresh_token: string }> => {
    const response = await api.post(LOGIN_ENDPOINT, { email, password, remember_me: rememberMe, role_code: roleCode });
    const { access_token, refresh_token } = response.data;
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return response.data;
};

export const register = async (display_name: string, email: string, password: string): Promise<void> => {
    const response = await api.post(REGISTER_ENDPOINT, { display_name, email, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post(LOGOUT_ENDPOINT);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get(PROFILE_ENDPOINT);
    return response.data;
};