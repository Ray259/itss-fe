import { createContext, ReactNode, useState } from 'react';
import { setAccessToken, setRefreshToken, clearTokens } from '@/utils/auth';

type Props = {
    children?: ReactNode;
};

type IAuthContext = {
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
};

const initialState = {
    isAuthenticated: false,
    setAuthenticated: () => {},
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<IAuthContext>(initialState);

const AuthProvider = ({ children }: Props) => {
    const [isAuthenticated, setAuthenticated] = useState(initialState.isAuthenticated);

    const login = (accessToken: string, refreshToken: string) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setAuthenticated(true);
    };

    const logout = () => {
        clearTokens();
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };