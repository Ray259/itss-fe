import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodImages from './FoodImages/FoodImages';
import FoodInfo from './FoodInfo/FoodInfo';
import UserReviewSection from './UserReviews/UserReviewSection';
import StarRating from '@/components/StarRating';
import { getFoodDetailsById } from '@/api/food-details.api';
import { getUserInfo } from '@/api/user-info.api';
import { getDishReviews } from '@/api/user-reviews.api'; // Import hàm lấy danh sách đánh giá
import { isLoggedIn } from '@/utils/auth';

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
    const [userId, setUserId] = useState<number | null>(null); // State để lưu trữ userId
    const [averageRating, setAverageRating] = useState<number | null>(null); // State để lưu trữ rating trung bình
    const [reviewCount, setReviewCount] = useState<number>(0); // State để lưu trữ số lượng đánh giá

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
        if (isLoggedIn()) { // Kiểm tra trạng thái đăng nhập trước khi gọi API
            const fetchUserInfo = async () => {
                try {
                    const userInfo = await getUserInfo();
                    setUserId(userInfo.id);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };

            fetchUserInfo();
        }
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (foodId) {
                    const reviews = await getDishReviews(foodId);
                    if (Array.isArray(reviews)) {
                        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
                        const average = totalRating / reviews.length;
                        setAverageRating(Math.round(average)); // Làm tròn rating trung bình
                        setReviewCount(reviews.length);
                    }
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [foodId]);

    if (!foodDetails) {
        return <div className='text-center text-gray-500 dark:text-gray-400'>Loading...</div>;
    }

    return (
        <div className='mx-auto bg-gray-100 dark:bg-gray-900 p-10 rounded-md shadow'>
            <div className='flex items-center p-4'>
                <div className='text-red-600 dark:text-red-300 font-bold text-2xl mr-4'>{foodDetails.name}</div>
                {averageRating !== null && (
                    <div className='flex items-center'>
                        <StarRating rating={averageRating} fixed />
                        <span className='text-gray-600 dark:text-gray-300 ml-2'>{averageRating} ({reviewCount} reviews)</span>
                    </div>
                )}
            </div>
            <FoodImages images={foodDetails.images} />
            <FoodInfo
                restaurantName={foodDetails.restaurant}
                location={foodDetails.address}
                price={foodDetails.price}
                details={foodDetails.info}
                categories={foodDetails.categories}
            />
            {isLoggedIn() && userId !== null && (
                <UserReviewSection dishId={foodId!} userId={userId} />
            )}
        </div>
    );
};

export default FoodDetailsPage;
