import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';
import { useDarkMode } from './contexts/DarkModeContext';

const App: React.FC = () => {
    const { darkMode } = useDarkMode();

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element}>
                            {route.children?.map((child, childIndex) => (
                                <Route key={childIndex} path={child.path} element={child.element} />
                            ))}
                        </Route>
                    ))}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
