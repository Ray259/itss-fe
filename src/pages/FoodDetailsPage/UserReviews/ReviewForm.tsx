import { useState } from 'react';
import StarRating from '@/components/StarRating';
import { useTranslation } from 'react-i18next';

interface ReviewFormProps {
    onCreateReview: (review: { comment: string; rating?: number }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onCreateReview }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const { t } = useTranslation('details');

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
        <div className='p-4 dark:bg-gray-900'>
            <div className='p-2 min-h-72 shadow-md border rounded-lg dark:border-gray-700 dark:bg-gray-800'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl text-red-600 dark:text-red-400 font-semibold'>{t('yourReview')}</h3>
                    <button
                        className='px-3 py-1 bg-[#ff1100] hover:bg-red-700 font-bold text-gray-100 rounded-xl dark:bg-red-600 dark:hover:bg-red-500'
                        onClick={handleSubmit}
                    >
                        {t('postReview')}
                    </button>
                </div>
                <div className='flex items-center'>
                    <StarRating rating={rating} onRatingChange={setRating} />
                </div>
                <textarea
                    className='w-full min-h-44 mt-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    placeholder={t('placeholderReview')}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ReviewForm;
