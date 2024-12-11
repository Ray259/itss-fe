import React, { useRef, useState, useEffect } from 'react';
import { getSuggestedDishes } from '@/api/food-views.api';

const HighRatedDishes: React.FC = () => {
    const [dishes, setDishes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);  // Dùng để theo dõi trang hiện tại
    const [per_page] = useState(10); // Số lượng món ăn mỗi lần lấy

    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);

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

    // Giả lập dữ liệu khi chưa có API thực
    const fakeDishes = Array(10).fill({
        price: '5.50',
        rating: '4.5',
        name: 'Salmon Salad',
        deliveryTime: '10-15 mins',
        images: ['link-to-image.jpg'],
        info: 'Delicious salmon salad with fresh veggies.',
        address: 'Tokyo, Japan'
    });

    // Gọi API để lấy danh sách món ăn đề xuất
    const fetchDishes = async () => {
        try {
            const response = await getSuggestedDishes({ per_page, page});
            setDishes(response.data); // Lưu dữ liệu món ăn vào state
            setLoading(false); // Đánh dấu việc tải dữ liệu hoàn tất
        } catch (err) {
            setDishes(fakeDishes); // Nếu API thất bại, sử dụng dữ liệu giả
            setError('Failed to fetch dishes, using fake data');
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
            className='p-6 rounded-lg'
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
                            className='bg-white p-4 rounded-lg shadow-md flex flex-col items-center'
                            style={{
                                minWidth: '150px',
                                flex: '1 0 auto'
                            }}
                        >
                            <div className='text-sm font-bold'>${dish.price}</div>
                            <div className='w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4'>
                                <img
                                    src={dish.images && dish.images.length > 0 ? dish.images[0] : 'default-image.jpg'} // Kiểm tra ảnh có tồn tại không
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
