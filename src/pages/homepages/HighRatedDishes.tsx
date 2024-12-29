import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDishes } from '@/api/food-views.api'; // Giả sử bạn có hàm này để lấy danh sách món ăn
import { useTranslation } from 'react-i18next';

const HighRatedDishes: React.FC = () => {
    const [dishes, setDishes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);  // Dùng để theo dõi trang hiện tại
    const [per_page] = useState(50); // Lấy nhiều món ăn để có thể sắp xếp và chọn ra 10 món ăn có rating cao nhất

    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation('homepage');

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

    // Gọi API để lấy danh sách món ăn và rating trung bình
    const fetchDishes = async () => {
        try {
            const response = await getDishes({ per_page, page });
            const dishesWithAvgRating = await Promise.all(response.data.map(async (dish: any) => {
                try {
                    const reviewsResponse = await axios.get(`https://itss-restaurant-backend.onrender.com/api/v1/reviews/dish/${dish.id}`);
                    const avgRating = parseFloat(reviewsResponse.data.avg_rating.toFixed(1)) || 0;
                    return { ...dish, avgRating };
                } catch (err) {
                    return { ...dish, avgRating: 0 }; // Gán giá trị mặc định nếu không thể lấy rating trung bình
                }
            }));

            // Sắp xếp các món ăn theo rating trung bình giảm dần
            const sortedDishes = dishesWithAvgRating.sort((a: any, b: any) => b.avgRating - a.avgRating);
            setDishes(sortedDishes.slice(0, 10)); // Lấy 10 món ăn có rating cao nhất
            setLoading(false); // Đánh dấu việc tải dữ liệu hoàn tất
        } catch (err) {
            setError('Failed to fetch dishes');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDishes();
        checkScroll();
    }, [page]);

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
                paddingRight: '40px'
            }}
        >
            <h2 className='text-lg font-bold text-gray-100 dark:text-gray-200 mb-4'>{t('highlyRated')}</h2>
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
                            onClick={() => navigate(`/food-details/${dish.id}`)}
                            style={{
                                transition: 'transform 0.3s', // Thêm transition để mượt mà
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Phóng to khi di chuột tới
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Quay lại kích thước ban đầu khi rời chuột
                        >
                            <div className='text-sm font-bold text-gray-900 dark:text-gray-100'>${dish.price}</div>
                            <div className='w-full h-32 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden mb-4'>
                                <img
                                    src={dish.images && dish.images.length > 0 ? dish.images[0] : 'default-image.jpg'}
                                    alt={dish.name}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='text-yellow-500 text-sm'>
                                {`⭐ ${dish.avgRating.toFixed(1)}`}
                            </div> {/* Hiển thị rating cụ thể */}
                            <div className='text-sm text-gray-900 dark:text-gray-100'>{dish.name}</div>
                            <div className='text-xs text-gray-500 dark:text-gray-400'>{dish.address}</div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className='absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-gray-100 dark:text-gray-300 p-2 rounded-full transition-colors'
                    style={{ zIndex: 10 }}
                >
                    <span
                        className='text-3xl text-red-500 dark:text-red-400'
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

export default HighRatedDishes;