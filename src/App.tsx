import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
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
