import api from '@configs/axios';
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, PROFILE_ENDPOINT, REGISTER_ENDPOINT } from '@configs/api-endpoints';

export const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true,
    roleCode: string = 'USER'
): Promise<void> => {
    const response = await api.post(LOGIN_ENDPOINT, { email, password, remember_me: rememberMe, role_code: roleCode });
    return response.data;
};

export const register = async (email: string, password: string): Promise<void> => {
    const response = await api.post(REGISTER_ENDPOINT, { email, password });
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
