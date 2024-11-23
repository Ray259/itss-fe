import { RouteObject } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import TestPage from '../pages/test';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: 'homepage',
                // TODO
                element: <TestPage />
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
    }
];

export default routes;
