import React, { useEffect, useState } from 'react';
import UserReview from './UserReview';
import ReviewForm from './ReviewForm';
import { getDishReviews, createDishReview } from '@/api/user-reviews.api';
import { isLoggedIn } from '@/utils/auth';
import { useTranslation } from 'react-i18next';

interface ReviewProps {
    id: number;
    user_id: number;
    dish_id: number;
    rating: number;
    comment: string;
    created_at: string;
    avatar?: string;
}

interface UserReviewSectionProps {
    dishId: string;
    userId: number;
    onCreateReview: () => void;
}

const UserReviewSection: React.FC<UserReviewSectionProps> = ({ dishId, userId, onCreateReview }) => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2;

    const fetchReviews = async () => {
        try {
            const fetchedReviews = await getDishReviews(dishId);
            if (Array.isArray(fetchedReviews)) {
                setReviews(fetchedReviews);
            } else {
                console.error('Fetched reviews is not an array:', fetchedReviews);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [dishId]);

    const handleCreateReview = async (review: { comment: string; rating?: number }) => {
        try {
            const newReview = await createDishReview(dishId, { ...review, userId });
            setReviews([newReview, ...reviews]);
            onCreateReview(); // Gọi lại hàm tải dữ liệu từ thành phần cha
        } catch (error) {
            console.error('Failed to create review:', error);
        }
    };

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const currentReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

    const { t } = useTranslation('details');
    return (
        <div className='flex border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900'>
            <div className='p-4 w-1/2'>
                <h2 className='text-2xl text-red-600 dark:text-red-400 font-semibold'>{t('reviews')}</h2>
                {currentReviews.map((review) => (
                    <UserReview key={review.id} {...review} />
                ))}
                <div className='flex justify-center items-center p-4'>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`mx-2 px-3 py-1 border rounded ${
                                currentPage === index + 1
                                    ? 'bg-red-600 text-gray-100 dark:bg-red-500'
                                    : 'bg-gray-200 text-red-600 dark:bg-gray-700 dark:text-red-400'
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className='w-1/2 bg-gray-100 dark:bg-gray-800'>
                {isLoggedIn() ? (
                    <ReviewForm onCreateReview={handleCreateReview} />
                ) : (
                    <div className='text-red-600 dark:text-red-300'>ログインしてレビューを投稿してください。</div>
                )}
            </div>
        </div>
    );
};

export default UserReviewSection;
