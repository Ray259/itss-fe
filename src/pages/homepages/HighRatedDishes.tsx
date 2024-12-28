import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDishes } from '@/api/food-views.api';

const HighRatedDishes: React.FC = () => {
    const [dishes, setDishes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);  // Dùng để theo dõi trang hiện tại
    const [per_page] = useState(50); // Lấy nhiều món ăn để có thể sắp xếp và chọn ra 10 món ăn có rating cao nhất

    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);

    const navigate = useNavigate();

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

    // Gọi API để lấy danh sách món ăn
    const fetchDishes = async () => {
        try {
            const response = await getDishes({ per_page, page });
            const sortedDishes = response.data.sort((a: any, b: any) => b.rating - a.rating); // Sắp xếp theo rating giảm dần
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
            className='p-6 rounded-lg mt-6'
            style={{
                background: 'linear-gradient(135deg, #ffdede, #ff1100)',
                paddingLeft: '40px',
                paddingRight: '40px'
            }}
        >
            <h2 className='text-lg font-bold text-red-500 mb-4'>高評価の料理</h2>
            <div className='relative'>
                {showLeftButton && (
                    <button
                        onClick={scrollLeft}
                        className='absolute left-[-40px] top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors'
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
                            className='bg-white p-4 rounded-lg shadow-md flex flex-col min-w-[300px] relative cursor-pointer'
                            onClick={() => navigate(`/food-details/${dish.id}`)}
                            style={{
                                transition: 'transform 0.3s', // Thêm transition để mượt mà
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} // Phóng to khi di chuột tới
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Quay lại kích thước ban đầu khi rời chuột
                        >
                            <div className='text-sm font-bold'>${dish.price}</div>
                            <div className='w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4'>
                                <img
                                    src={dish.images && dish.images.length > 0 ? dish.images[0] : 'default-image.jpg'}
                                    alt={dish.name}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='text-yellow-500 text-sm'>{dish.info ? `⭐ ${dish.info}` : '⭐ No Rating'}</div> {/* Thay info cho rating */}
                            <div className='text-sm'>{dish.name}</div>
                            <div className='text-xs text-gray-500'>{dish.address}</div>
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

export default HighRatedDishes;
