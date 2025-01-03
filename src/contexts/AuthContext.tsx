import { createContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken, clearTokens, getAccessToken } from '@/utils/auth';
import { getUserInfo } from '@/api/user-info.api';
import { useTranslation } from 'react-i18next';

type Props = {
    children?: ReactNode;
};

type IAuthContext = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
};

export type UserProfile = {
    id?: number;
    display_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    location?: string;
    avatar_url?: string;
    dark_mode?: boolean;
    language?: string;
    font_size?: number;
    notification?: boolean;
    loved_flavor?: string[];
    hated_flavor?: string[];
    loved_dish?: string[];
    vegetarian?: boolean;
    loved_distinct?: number;
    loved_price?: number;
};

const initialState = {
    isAuthenticated: false,
    setAuthenticated: () => {},
    login: () => {},
    logout: () => {},
    user: null,
    setUser: () => {}
};

const AuthContext = createContext<IAuthContext>(initialState);

const AuthProvider = ({ children }: Props) => {
    const [isAuthenticated, setAuthenticated] = useState(initialState.isAuthenticated);
    const [user, setUser] = useState<UserProfile | null>(initialState.user);
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = getAccessToken();
            if (token) {
                setAuthenticated(true);
                try {
                    const user = await getUserInfo();
                    console.log('Fetched user info:', user);
                    setUser(user);
                    if (user.language) {
                        i18n.changeLanguage(user.language);
                    }
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                    logout();
                }
            }
        };

        initializeAuth();
    }, [i18n]);

    const login = async (accessToken: string, refreshToken: string) => {
        try {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setAuthenticated(true);

            // Set user info
            console.log('Fetching user info...');
            const user = await getUserInfo();
            if (user.language) {
                i18n.changeLanguage(user.language);
                console.log('User language:', user.language);
            }
            setUser(user);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            logout();
        }
    };

    const logout = () => {
        clearTokens();
        setAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };