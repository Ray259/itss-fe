import React from 'react';
import userAvatar from '@assets/img/user-avatar.svg';

interface UserReviewProps {
    id: number;
    user_id: number;
    dish_id: number;
    rating: number;
    comment: string;
    created_at: string;
    avatar?: string; // Nếu avatar là một giá trị tùy chọn
}

const UserReview: React.FC<UserReviewProps> = ({ rating, comment, created_at, avatar }) => {
    return (
        <div className='p-4 border-b'>
            <img src={avatar || userAvatar} className='w-10 h-10 rounded-full border' alt="User Avatar" />
            <div className='text-lg font-semibold'>Rating: {rating}</div>
            <div className='text-sm'>{comment}</div>
            <div className='text-xs text-gray-500'>{new Date(created_at).toLocaleString()}</div>
        </div>
    );
};

export default UserReview;
