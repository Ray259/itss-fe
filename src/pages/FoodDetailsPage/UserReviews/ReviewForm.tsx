import { useState } from 'react';
import StarRating from '@/components/StarRating';

interface ReviewFormProps {
    onCreateReview: (review: { comment: string; rating?: number }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onCreateReview }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        if (review.trim() && rating > 0) {
            onCreateReview({ comment: review, rating });
            setReview('');
            setRating(0);
        } else {
            alert('Please provide both a comment and a rating.');
        }
    };

    return (
        <div className='p-4 bg-gray-100 dark:bg-gray-900 shadow'>
            <div className='p-4 shadow-md rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-lg text-red-600 dark:text-red-400 font-semibold'>あなたのレビュー</h3>
                    <button
                        className='px-3 py-1 bg-[#ff1100] hover:bg-red-700 font-bold text-gray-100 rounded-xl dark:bg-red-600 dark:hover:bg-red-500'
                        onClick={handleSubmit}
                    >
                        投稿
                    </button>
                </div>
                <div className='flex items-center mt-4'>
                    <StarRating rating={rating} onRatingChange={setRating} />
                </div>
                <textarea
                    className='w-full mt-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    placeholder='ここにレビューを追加してください...'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ReviewForm;
