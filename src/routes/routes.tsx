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
import { isLoggedIn } from '@/utils/auth';
const routes: RouteObject[] = [
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: isLoggedIn() ? <Navigate to="/homepage" /> : <LandingPage />
            },
            {
                path: 'homepage',
                element: isLoggedIn() ? <HomePage /> : <Navigate to="/" />
            },
            {
                path: 'food-details/:foodId',
                element: <FoodDetailsPage />
            },
            {
                path: 'profile',
                element: isLoggedIn() ? <TestPage /> : <Navigate to="/login" />
            },
            {
                path: 'contact',
                element: <TestPage />
            },
            {
                path: 'settings',
                element: isLoggedIn() ? <Settings /> : <Navigate to="/login" />
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
        path: '/anket',
        element: <Anket />
    },
    {
        path: '/likeanddislikepage',
        element: isLoggedIn() ? <LikeAndDislikePage /> : <Navigate to="/login" />
    },
    {
        path: '/addfoodadmin',
        element: isLoggedIn() ? <AddFoodForm /> : <Navigate to="/login" />
    },
    {
        path: '/updatefoodadmin/:dishId',
        element: isLoggedIn() ? <UpdateFoodForm /> : <Navigate to="/login" />
    },
    {
        path: '/dishes',
        element: isLoggedIn() ? <DishesList /> : <Navigate to="/login" />
    }
];

export default routes;
