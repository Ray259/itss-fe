import React from 'react';
import userAvatar from '@assets/img/user-avatar.svg';
import StarRating from '@/components/StarRating';
import { useTranslation } from 'react-i18next';

interface UserReviewProps {
    id: number;
    user_id: number;
    dish_id: number;
    rating: number;
    comment: string;
    created_at: string;
    avatar?: string; // Optional avatar value
}

const UserReview: React.FC<UserReviewProps> = ({ rating, comment, created_at, avatar }) => {
    const { t } = useTranslation('details');
    return (
        <div className='p-4 border-b border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm'>
            <div className='flex items-center mb-3'>
                <img
                    src={avatar || userAvatar}
                    className='w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600'
                    alt='User Avatar'
                />
                <div className='ml-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>
                    {t('rating')}
                    <StarRating rating={rating} fixed={true} />
                </div>
            </div>
            <div className='text-sm text-gray-700 dark:text-gray-300 mb-2'>{comment}</div>
            <div className='text-xs text-gray-500 dark:text-gray-400'>{new Date(created_at).toLocaleString()}</div>
        </div>
    );
};

export default UserReview;
