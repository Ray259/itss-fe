import { UserProfile } from '@/contexts/AuthContext';

export const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

export const setLocalUser = (user: UserProfile) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getLocalUser = (): UserProfile | null => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
};

export const isLoggedIn = () => {
    return !!localStorage.getItem('accessToken');
};

export const clearLocalUser = () => {
    localStorage.removeItem('user');
};
