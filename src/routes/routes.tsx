import { RouteObject } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import TestPage from '../pages/test';
import Login from '@pages/Login/page';
import Register from '@pages/Register/page'
import HomePage from '../pages/homepages/HomePage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: 'homepage',
                // TODO
                element: <HomePage />
            },
            {
                path: 'survey',
                // TODO
                element: <TestPage />
            },
            {
                path: 'profile',
                // TODO
                element: <TestPage />
            },
            {
                path: 'contact',
                // TODO
                element: <TestPage />
            },
            {
                path: 'settings',
                // TODO
                element: <TestPage />
            },
            {
                path: 'help',
                // TODO
                element: <TestPage />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
];

export default routes;
