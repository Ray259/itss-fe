import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import BaseLayout from '@/layouts/BaseLayout';
import TestPage from '@/pages/test';
import Login from '@pages/Login/page';
import Register from '@pages/Register/page';
import HomePage from '@/pages/homepages/HomePage';
import LandingPage from '@/pages/homepages/LandingPage';
import FoodDetailsPage from '@/pages/FoodDetailsPage/FoodDetailsPage';
import Anket from '@/pages/Anket/page';
import Settings from '@/pages/Settings/page';
import LikeAndDislikePage from '@/pages/LikeAndDislikePage/page';
import AddFoodForm from '@/pages/AddFoodAdmin/AddFood';
import UpdateFoodForm from '@/pages/UpdateFoodAdmin/Updatefood';
import DishesList from '@/pages/DishesListAdmin/disheslist';
import ProtectedRoute from '@/components/ProtectedRoute';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: 'homepage',
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'food-details/:foodId',
                element: <FoodDetailsPage />
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <TestPage />
                    </ProtectedRoute>
                )
            },
            {
                path: 'contact',
                element: <TestPage />
            },
            {
                path: '/anket',
                element: (<ProtectedRoute>
                    <Anket />
                    </ProtectedRoute>
                )
            },
            {
                path: 'settings',
                element: (
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                )
            },
            {
                path: 'help',
                element: <TestPage />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/login/:role',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/likeanddislikepage',
        element: (
            <ProtectedRoute>
                <LikeAndDislikePage />
            </ProtectedRoute>
        )
    },
    {
        path: '/addfoodadmin',
        element: (
            <ProtectedRoute>
                <AddFoodForm />
            </ProtectedRoute>
        )
    },
    {
        path: '/dishes/:dishId',
        element: <UpdateFoodForm />
    },
    {
        path: '/admin/dishes',
        element: (
            <ProtectedRoute>
                <DishesList />
            </ProtectedRoute>
        )
    }
];

export default routes;
