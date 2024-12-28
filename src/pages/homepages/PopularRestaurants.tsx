import React, { useRef, useState, useEffect } from 'react';
import { getSuggestedDishes } from '@/api/food-views.api';

const RecommendedMenu: React.FC = () => {
    const [dishes, setDishes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [selectedDish, setSelectedDish] = useState<any | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Gọi API để lấy danh sách món ăn đề xuất
    const fetchDishes = async () => {
        try {
            const response = await getSuggestedDishes({ per_page: 50, page: 1 });
            const sortedDishes = response.data.sort((a: any, b: any) => a.distance - b.distance); // Sắp xếp theo khoảng cách
            setDishes(sortedDishes);
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
    }, []); // Chỉ gọi fetchDishes một lần khi component được mount

    const handleDishClick = (dish: any) => {
        setSelectedDish(dish);
    };

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
                background: 'linear-gradient(135deg, #ff1100, #ffdede)',
                paddingLeft: '40px',
                paddingRight: '40px'
            }}
        >
            <h2 className='text-lg font-bold text-white mb-4'>近くのおすすめメニュー</h2>
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
                            onClick={() => handleDishClick(dish)}
                        >
                            <div className='absolute top-2 right-2 text-xl font-bold text-red-500'>
                                {dish.distance} km
                            </div>

                            <div className='w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4'>
                                <img src={dish.images && dish.images.length > 0 ? dish.images[0] : 'default-image.jpg'} alt={dish.name} className='w-full h-full object-cover' />
                            </div>

                            <div className='text-sm font-bold'>{dish.name}</div>
                            <div className='text-xs text-gray-500'>{dish.deliveryTime}</div>
                            <div className='flex flex-wrap gap-1 mt-2'>
                                {dish.ingredients && dish.ingredients.map((ingredient: string, i: number) => (
                                    <span key={i} className='px-2 py-1 text-xs bg-gray-200 rounded-full text-gray-600'>
                                        {ingredient}
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

            {selectedDish && (
                <div className='mt-6 p-4 bg-white rounded-lg shadow-md'>
                    <h3 className='text-xl font-bold text-red-500'>{selectedDish.name}</h3>
                    <p>{selectedDish.details}</p>
                </div>
            )}
        </div>
    );
};

export default RecommendedMenu;
