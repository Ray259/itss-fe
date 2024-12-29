import { isLoggedIn } from '@/utils/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const check = isLoggedIn();

    if (!check) {
        return <Navigate to='/login' />;
    }

    return children;
};

export default ProtectedRoute;
