import { createContext, ReactNode, useState } from 'react';
import { setAccessToken, setRefreshToken, clearTokens, setLocalUser, clearLocalUser } from '@/utils/auth';
import { getUserInfo } from '@/api/user-info.api';

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
    id: string;
    username: string;
    avatar?: string;
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

    const login = async (accessToken: string, refreshToken: string) => {
        try {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setAuthenticated(true);

            // Set user info
            console.log('Fetching user info...');
            const user = await getUserInfo();
            console.log('User info:', user);
            setUser(user);
            setLocalUser(user);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            logout();
        }
    };

    const logout = () => {
        clearTokens();
        clearLocalUser();
        setAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
