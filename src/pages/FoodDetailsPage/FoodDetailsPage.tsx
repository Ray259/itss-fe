import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodImages from './FoodImages/FoodImages';
import FoodInfo from './FoodInfo/FoodInfo';
import UserReviewSection from './UserReviews/UserReviewSection';
import StarRating from '@/components/StarRating';
import { getFoodDetailsById } from '@/api/food-details.api';
import { getUserInfo } from '@/api/user-info.api';

interface FoodDetailsData {
    id: number;
    name: string;
    address: string;
    price: number;
    info: string;
    images: string[];
    categories: string[];
    restaurant: string;
}

const FoodDetailsPage: React.FC = () => {
    const { foodId } = useParams<{ foodId: string }>();
    const [foodDetails, setFoodDetails] = useState<FoodDetailsData | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    const rating = 4; // TODO: fetch reviews, calculate rating

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                if (foodId) {
                    const data = await getFoodDetailsById(foodId);
                    setFoodDetails(data);
                }
            } catch (error) {
                console.error('Error fetching food details:', error);
            }
        };

        fetchFoodDetails();
    }, [foodId]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUserId(userInfo.id);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!foodDetails || userId === null) {
        return <div className='text-center text-gray-500 dark:text-gray-400'>Loading...</div>;
    }

    return (
        <div className='mx-auto bg-gray-100 dark:bg-gray-900 p-10 rounded-md shadow'>
            <div className='flex items-center p-4'>
                <div className='text-red-600 dark:text-red-400 font-bold text-2xl mr-4'>
                    {foodDetails.name}
                </div>
                <div className='flex items-center'>
                    <StarRating rating={rating} fixed />
                </div>
            </div>
            <FoodImages images={foodDetails.images} />
            <FoodInfo
                restaurantName={foodDetails.restaurant}
                location={foodDetails.address}
                price={foodDetails.price}
                details={foodDetails.info}
                categories={foodDetails.categories}
            />
            <UserReviewSection dishId={foodId} userId={userId} />
        </div>
    );
};

export default FoodDetailsPage;
