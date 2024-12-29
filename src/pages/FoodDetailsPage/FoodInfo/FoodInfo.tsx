import React from 'react';
import pathIcon from '@assets/img/path-icon.png';
import { formatPrice } from '@/utils/priceFormatter';
import FoodCategories from './FoodCategories';

interface FoodInfoProps {
    restaurantName: string;
    location: string;
    price: number;
    details: string;
    categories: string[];
}

const FoodInfo: React.FC<FoodInfoProps> = ({ restaurantName, location, price, details, categories }) => (
    <div className='bg-gray-100 dark:bg-gray-900 rounded-md shadow p-4'>
        <div className='flex justify-between text-xl items-center p-4 mt-2'>
            <div>
                <div className='flex text-red-600 dark:text-red-400'>
                    <img src={pathIcon} className='h-6 mr-2' alt='Path Icon' />
                    <div className='text-xl font-bold mb-2'>{restaurantName}</div>
                </div>
                <div className='italic mt-2 text-gray-700 dark:text-gray-400'>{location}</div>
            </div>
            <div className='text-3xl text-red-600 font-bold dark:text-red-400'>
                {formatPrice(price, 'VND')}
            </div>
        </div>
        <div className='flex border-t border-gray-300 dark:border-gray-700 p-4'>
            <div className='w-1/2'>
                <h2 className='text-red-600 text-2xl font-semibold dark:text-red-400'>詳細情報</h2>
                <p className='mt-2 text-gray-700 dark:text-gray-400 pr-20'>{details}</p>
            </div>
            <div className='w-1/2'>
                <FoodCategories categories={categories} />
            </div>
        </div>
    </div>
);

export default FoodInfo;
