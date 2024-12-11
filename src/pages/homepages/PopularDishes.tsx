import React, { useRef, useState, useEffect } from 'react';

const PopularDishes: React.FC = () => {
    const popularDishes = [
        { name: 'Salmon Salad', price: '12.50', rating: '4.5', deliveryTime: '15-20 mins', image: 'salmon-salad.jpg', description: 'A healthy salad made with fresh salmon, greens, and a tangy vinaigrette.' },
        { name: 'Chicken Caesar', price: '10.00', rating: '4.0', deliveryTime: '10-15 mins', image: 'chicken-caesar.jpg', description: 'Crispy chicken on a bed of romaine lettuce with Caesar dressing.' },
        { name: 'Veggie Bowl', price: '8.50', rating: '4.2', deliveryTime: '20-25 mins', image: 'veggie-bowl.jpg', description: 'A colorful bowl of mixed vegetables with quinoa and a light dressing.' },
    ];

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

    useEffect(() => {
        checkScroll();
    }, []);

    return (
        <div
            className='p-6 rounded-lg mt-6'
            style={{
                background: 'linear-gradient(135deg, #ff1100, #ffdede)',
                paddingLeft: '40px',
                paddingRight: '40px'
            }}
        >
            <h2 className='text-lg font-bold text-white mb-4'>みんなもこれ見ていますよ！（これもやってみようか？）</h2>
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
                    {popularDishes.map((dish, index) => (
                        <div
                            key={index}
                            className='bg-white p-4 rounded-lg shadow-md flex flex-col min-w-[300px] relative'
                        >
                            <div className='w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4'>
                                <img src={dish.image} alt={dish.name} className='w-full h-full object-cover' />
                            </div>

                            <div className='text-sm font-bold'>{dish.name}</div>
                            <div className='text-xs text-gray-500'>{dish.deliveryTime}</div>
                            <div className='mt-2'>
                                <span className='text-sm font-bold text-red-500'>${dish.price}</span>
                                <span className='ml-2 text-sm text-yellow-500'>{dish.rating} stars</span>
                            </div>
                            <div className='text-xs text-gray-600 mt-2'>{dish.description}</div>
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

export default PopularDishes;
