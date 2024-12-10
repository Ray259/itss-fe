import { RouteObject } from 'react-router-dom';
import BaseLayout from '@/layouts/BaseLayout';
import TestPage from '@/pages/test';
import Login from '@pages/Login/page';
import Register from '@pages/Register/page';
import HomePage from '@/pages/homepages/HomePage';
<<<<<<< HEAD
import FoodDetailsPage from '@/pages/FoodDetailsPage/FoodDetailsPage'; 
import Anket from '@/pages/Anket/page';
=======
import FoodDetailsPage from '@/pages/FoodDetailsPage/FoodDetailsPage';
import Anket from '@/pages/Anket/page';

>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: 'homepage',
                // TODO
                element: <HomePage />
            },
            {
                path: 'food-details/:foodId',
                element: <FoodDetailsPage />
            },
           
            {
                path: 'survey',
                // TODO
                element: <Anket />
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
    },
    {
        path: '/anket',
        element: <Anket />
    }
];

export default routes;
