import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuggestedDishes } from '@/api/food-views.api';
import { useTranslation } from 'react-i18next';
import { ClockIcon } from '@heroicons/react/24/solid'; //

const RecommendedMenu: React.FC = () => {
    const { t } = useTranslation('homepage');
    const [dishes, setDishes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate(); // Khởi tạo hook useNavigate
    const daysOfWeek = t('daysOfWeek', { returnObjects: true }) as string[];

    // Gọi API để lấy danh sách món ăn đề xuất
    const fetchDishes = async () => {
        try {
            const response = await getSuggestedDishes({ per_page: 7, page: 1 });
            const suggestedDishes = response.data.slice(0, 7).map((dish: any, index: number) => ({
                ...dish,
                day: daysOfWeek[index] // Gán ngày cho từng món ăn
            }));
            setDishes(suggestedDishes);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch suggested dishes');
            setLoading(false);
        }
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            const isAtStart = scrollRef.current.scrollLeft === 0;
            setShowLeftButton(!isAtStart);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
            checkScroll();
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
            checkScroll();
        }
    };

    useEffect(() => {
        fetchDishes();
        checkScroll();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div
            className='p-6 rounded-lg mt-6 bg-gradient-to-r from-red-500 to-pink-100 dark:from-gray-700 dark:to-red-500'
            style={{
                paddingLeft: '40px',
                paddingRight: '40px',
                boxShadow: '15px 15px 30px rgba(255, 255, 255, 0.5)',
                borderRadius: '15px'
            }}
        >
            <h2 className='text-lg font-bold text-white mb-4'>{t('weeklyRecommendation')}</h2>
            <div className='relative'>
                {showLeftButton && (
                    <button
                        onClick={scrollLeft}
                        className='absolute left-[-40px] top-1/2 transform -translate-y-1/2 text-gray-100 dark:text-gray-300 p-2 rounded-full transition-colors'
                        style={{ zIndex: 10 }}
                    >
                        <span
                            className='text-3xl'
                            style={{
                                transform: 'scaleY(6)',
                                display: 'inline-block',
                                lineHeight: 0,
                                fontWeight: 'lighter'
                            }}
                        >
                            &lt;
                        </span>
                    </button>
                )}
                <div
                    ref={scrollRef}
                    className='flex space-x-4 overflow-hidden'
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        scrollBehavior: 'smooth',
                        overflow: 'hidden'
                    }}
                >
                    {dishes.map((dish, index) => (
                        <div
                            key={index}
                            className='bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md flex flex-col min-w-[300px] relative cursor-pointer'
                            onClick={() => navigate(`/food-details/${dish.id}`)} // Điều hướng đến trang chi tiết món ăn
                            style={{
                                transition: 'transform 0.3s', // Thêm transition để mượt mà
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Phóng to khi di chuột tới
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Quay lại kích thước ban đầu khi rời chuột
                        >
                            {/* Ngày hiển thị trong hộp */}
                            <div className="absolute top-2 right-2 bg-white shadow-lg rounded-full p-2 text-[#FE724C] font-bold text-base flex items-center justify-center" style={{ boxShadow: '0px 5px 20px rgba(255, 255, 255, 0.5)' }}>
                                <span className="text-lg">{dish.day}</span>
                            </div>

                            <div className='w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4'>
                                <img src={dish.images && dish.images.length > 0 ? dish.images[0] : 'default-image.jpg'} alt={dish.name} className='w-full h-full object-cover' />
                            </div>
                            <div className='text-sm font-bold'>{dish.name}</div>
                            {/* Thời gian giao hàng */}
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                <ClockIcon className="text-[#FE724C] mr-1" style={{ width: '16px', height: '16px' }} />
                                {dish.info}
                            </div>
                            <div className='flex flex-wrap gap-1 mt-2'>
                                {dish.categories && dish.categories.map((category: string, i: number) => (
                                    <span key={i} className='px-2 py-1 text-xs bg-gray-200 rounded-full text-gray-600'>
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className='absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors'
                    style={{ zIndex: 10 }}
                >
                    <span
                        className='text-3xl text-red-500'
                        style={{
                            transform: 'scaleY(6)',
                            display: 'inline-block',
                            lineHeight: 0,
                            fontWeight: 'lighter'
                        }}
                    >
                        &gt;
                    </span>
                </button>
            </div>
        </div>
    );
};

export default RecommendedMenu;
