import React, { useState } from 'react';
import pathIcon from '@assets/img/path-icon.png';
import userAvatar from '@assets/img/user-avatar.svg';
import arrowLeft from '@assets/img/arrow-left.png';
import arrowRight from '@assets/img/arrow-right.png';

const mockData = {
    restaurantName: 'マクドナルド',
    location: 'No. 1 Dai Co Viet, Bach Khoa, Hai Ba Trung, Hanoi',
    price: '45.000đ',
    details:
        'Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh chopped. Spices – chili powder, cumin, onion powder.',
    categories: ['ベジタリアン', 'ベトナム', '健康'],
    reviews: [
        {
            username: 'ユーザー名1',
            date: '25/06/2020',
            comment:
                'Really convenient and the points system helps benefit loyalty. Some mild glitches here and there, but nothing too egregious. Obviously needs to roll out to more remote.'
        },
        {
            username: 'ユーザー名2',
            date: '26/06/2020',
            comment: 'Great experience overall. Would recommend to friends and family!'
        },
        {
            username: 'ユーザー名3',
            date: '27/06/2020',
            comment: 'The food was delicious and the service was excellent.'
        },
        {
            username: 'ユーザー名4',
            date: '28/06/2020',
            comment: 'A bit pricey but worth it for the quality.'
        },
        {
            username: 'ユーザー名5',
            date: '29/06/2020',
            comment: 'Not bad, but I have had better.'
        },
        {
            username: 'ユーザー名6',
            date: '30/06/2020',
            comment: 'Amazing experience! Will come back again.'
        }
    ],
    foodName: 'Ground Beef Taco',
    rating: 4.5
};

interface ImageSliderProps {
    images: string[];
    itemsToShow?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, itemsToShow = 4 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalItems = images.length;
    const maxIndex = Math.max(0, totalItems - itemsToShow);

    const canScrollNext = currentIndex < maxIndex;
    const canScrollPrevious = currentIndex > 0;

    const goToPrevious = () => {
        if (canScrollPrevious) {
            setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
        }
    };

    const goToNext = () => {
        if (canScrollNext) {
            setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsToShow, maxIndex));
        }
    };

    return (
        <div className='relative w-full mx-auto rounded-2xl shadow-lg flex items-center p-8'>
            {/* Previous Button */}
            {canScrollPrevious && (
                <button onClick={goToPrevious} className='p-3 rounded-full transition'>
                    <img src={arrowLeft} alt='Previous' className='h-8' />
                </button>
            )}

            {/* Carousel Container */}
            <div className='overflow-hidden rounded-lg flex-1 mx-2'>
                <div
                    className='flex transition-transform duration-500'
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            style={{
                                flex: `0 0 ${100 / itemsToShow}%`
                            }}
                            className='px-2'
                        >
                            <img src={image} alt={`Image ${index}`} className='w-full h-48 object-cover rounded-lg' />
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Button */}
            {canScrollNext && (
                <button onClick={goToNext} className='p-3 rounded-full transition'>
                    <img src={arrowRight} alt='Next' className='h-8' />
                </button>
            )}
        </div>
    );
};

const FoodImages = () => {
    const images = [
        'https://via.placeholder.com/800x400?text=Slide+1',
        'https://via.placeholder.com/800x400?text=Slide+2',
        'https://via.placeholder.com/800x400?text=Slide+3',
        'https://via.placeholder.com/800x400?text=Slide+4',
        'https://via.placeholder.com/800x400?text=Slide+1',
        'https://via.placeholder.com/800x400?text=Slide+2',
        'https://via.placeholder.com/800x400?text=Slide+3',
        'https://via.placeholder.com/800x400?text=Slide+4'
    ];

    return (
        <div className='flex items-center justify-center'>
            <ImageSlider images={images} />
        </div>
    );
};

const Header: React.FC<{ restaurantName: string; location: string; price: string }> = ({
    restaurantName,
    location,
    price
}) => {
    return (
        <div className='p-4 flex justify-between text-xl items-center'>
            <div>
                <div className='flex text-red-600'>
                    <img src={pathIcon} className='h-6 mr-2' />
                    <div className='text-xl font-bold mb-2'>{restaurantName}</div>
                </div>
                <div className='italic'>{location}</div>
            </div>
            <div className='text-2xl text-red-600 font-bold'>{price}</div>
        </div>
    );
};

const Details: React.FC<{ details: string }> = ({ details }) => {
    return (
        <div className='p-4'>
            <h2 className='text-red-600 text-xl font-semibold'>詳細情報</h2>
            <p className='mt-2'>{details}</p>
        </div>
    );
};

interface TagProps {
    children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
    return (
        <span className='inline-flex items-center px-4 py-1 bg-red-400 text-white font-semibold rounded-xl'>
            {children}
        </span>
    );
};

const Categories: React.FC<{ categories: string[] }> = ({ categories }) => {
    return (
        <div className='p-4'>
            <h2 className='p-2 text-xl text-red-600 font-semibold'>カテゴリー</h2>
            <div className='p-2 flex flex-wrap gap-2 mt-2 shadow-md rounded-lg border min-h-32 items-start'>
                {categories.map((category, index) => (
                    <Tag key={index}>{category}</Tag>
                ))}
            </div>
        </div>
    );
};

interface ReviewProps {
    username: string;
    date: string;
    comment: string;
    avatar?: string;
}

const Review: React.FC<ReviewProps> = ({ username, date, comment, avatar }) => {
    return (
        <div className='p-4 border-b'>
            <div className='flex items-center gap-2'>
                <img src={avatar || userAvatar} className='w-10 h-10 rounded-full border' />
                <div>
                    <h4 className='font-bold'>{username}</h4>
                    <span className='text-gray-500 text-sm'>{date}</span>
                </div>
            </div>
            <p className='mt-2'>{comment}</p>
        </div>
    );
};

const Reviews: React.FC<{ reviews: ReviewProps[] }> = ({ reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 2;

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    return (
        <div className='p-4'>
            <h2 className='text-xl text-red-600 font-semibold'>レビュー</h2>
            {currentReviews.map((review, index) => (
                <Review key={index} {...review} />
            ))}
            <div className='flex justify-center items-center p-4'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-2 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-red-600'}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ReviewForm: React.FC = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        // TODO
        setReview('');
        setRating(0);
    };

    return (
        <div className='p-4'>
            <div className='p-2 shadow-md rounded-lg border-x min-h-64'>
                <div className='flex justify-between'>
                    <h3 className='text-lg text-red-600 font-semibold'>あなたのレビュー</h3>
                    <button className='px-3 py-1 bg-[#ff1100] font-bold text-white rounded-xl' onClick={handleSubmit}>
                        投稿
                    </button>
                </div>
                <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            className={`fa-star ${rating >= star ? 'fas' : 'far'} text-yellow-500 cursor-pointer`}
                            onMouseEnter={() => setRating(star)}
                            onMouseLeave={() => setRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                <textarea
                    className='w-full mt-2 p-2 border border-gray-300 rounded min-h-32'
                    placeholder='ここにレビューを追加してください...'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </div>
        </div>
    );
};

const FoodDetails: React.FC = () => {
    return (
        <div className='mx-auto bg-white p-10'>
            <div className='flex items-center p-4'>
                <div className='text-red-600 font-bold text-2xl mr-4'>{mockData.foodName}</div>
                <div className='flex items-center'>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            className={`fa-star ${mockData.rating >= star ? 'fas' : 'far'} text-yellow-400`}
                        />
                    ))}
                </div>
            </div>
            <FoodImages />
            <Header restaurantName={mockData.restaurantName} location={mockData.location} price={mockData.price} />
            <div className='flex border-t'>
                <div className='w-1/2'>
                    <Details details={mockData.details} />
                </div>
                <div className='w-1/2'>
                    <Categories categories={mockData.categories} />
                </div>
            </div>
            <div className='flex border-t'>
                <div className='w-1/2'>
                    <Reviews reviews={mockData.reviews} />
                </div>
                <div className='w-1/2'>
                    <ReviewForm />
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
