import React, { useEffect, useState } from 'react';
import UserReview from './UserReview';
import ReviewForm from './ReviewForm';
import { getDishReviews, createDishReview } from '@/api/user-reviews.api';
import { isLoggedIn } from '@/utils/auth';

interface ReviewProps {
    id: number;
    user_id: number;
    dish_id: number;
    rating: number;
    comment: string;
    created_at: string;
    avatar?: string;
}

const UserReviewSection: React.FC<{ dishId: string; userId: number }> = ({ dishId, userId }) => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]); // Khởi tạo là một mảng rỗng
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await getDishReviews(dishId);
                // Đảm bảo rằng fetchedReviews là một mảng
                if (Array.isArray(fetchedReviews)) {
                    setReviews(fetchedReviews);
                } else {
                    console.error('Fetched reviews is not an array:', fetchedReviews);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        fetchReviews();
    }, [dishId]);

    const handleCreateReview = async (review: { comment: string; rating?: number }) => {
        try {
            const newReview = await createDishReview(dishId, { ...review, userId });
            setReviews([newReview, ...reviews]);
        } catch (error) {
            console.error('Failed to create review:', error);
        }
    };

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const currentReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

    return (
        <div className='flex border-t'>
            <div className='p-4 w-1/2'>
                <h2 className='text-2xl text-red-600 font-semibold'>レビュー</h2>
                {currentReviews.map((review) => (
                    <UserReview key={review.id} {...review} />
                ))}
                <div className='flex justify-center items-center p-4'>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`mx-2 px-3 py-1 border rounded ${
                                currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-red-600'
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className='w-1/2'>
                {isLoggedIn() ? (
                    <ReviewForm onCreateReview={handleCreateReview} />
                ) : (
                    <div className='text-red-600'>ログインしてレビューを投稿してください。</div>
                )}
            </div>
        </div>
    );
};

export default UserReviewSection;
