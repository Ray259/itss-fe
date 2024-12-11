import React, { useRef, useState, useEffect } from 'react';

const RecommendedMenu: React.FC = () => {
    const recommendedDishes = [
        {
            name: 'Salmon Salad',
            ingredients: ['Salmon', 'Lettuce', 'Olive oil', 'Lemon'],
            deliveryTime: '15-20 mins',
            image: 'salmon-salad.jpg',
            details: 'A healthy salad with fresh salmon and a citrus dressing.',
            day: '月' // Monday
        },
        {
            name: 'Chicken Teriyaki',
            ingredients: ['Chicken', 'Teriyaki sauce', 'Rice', 'Vegetables'],
            deliveryTime: '20-30 mins',
            image: 'chicken-teriyaki.jpg',
            details: 'Grilled chicken with teriyaki sauce served with steamed rice.',
            day: '火' // Tuesday
        },
        {
            name: 'Vegan Bowl',
            ingredients: ['Tofu', 'Avocado', 'Brown rice', 'Vegetables'],
            deliveryTime: '15-20 mins',
            image: 'vegan-bowl.jpg',
            details: 'A vegan-friendly bowl with tofu, avocado, and a variety of vegetables.',
            day: '水' // Wednesday
        },
        {
            name: 'Beef Stir Fry',
            ingredients: ['Beef', 'Bell peppers', 'Onions', 'Soy sauce'],
            deliveryTime: '10-15 mins',
            image: 'beef-stir-fry.jpg',
            details: 'Stir-fried beef with bell peppers and onions in a savory soy sauce.',
            day: '木' // Thursday
        },
        {
            name: 'Shrimp Tempura',
            ingredients: ['Shrimp', 'Tempura batter', 'Rice', 'Vegetables'],
            deliveryTime: '10-15 mins',
            image: 'shrimp-tempura.jpg',
            details: 'Crispy shrimp tempura served with steamed rice.',
            day: '金' // Friday
        },
        {
            name: 'Sushi Platter',
            ingredients: ['Rice', 'Nori', 'Fish', 'Vegetables'],
            deliveryTime: '20-30 mins',
            image: 'sushi-platter.jpg',
            details: 'Assorted sushi rolls with fresh fish and vegetables.',
            day: '土' // Saturday
        },
        {
            name: 'Ramen',
            ingredients: ['Noodles', 'Broth', 'Pork', 'Vegetables'],
            deliveryTime: '15-20 mins',
            image: 'ramen.jpg',
            details: 'A hot bowl of ramen with rich broth and tender pork.',
            day: '日' // Sunday
        },
    ];

    const [showLeftButton, setShowLeftButton] = useState(false);
    const [selectedDish, setSelectedDish] = useState<any | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

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

    const handleDishClick = (dish: any) => {
        setSelectedDish(dish);
    };

    return (
        <div
            className='p-6 rounded-lg mt-6'
            style={{
                background: 'linear-gradient(135deg, #ff1100, #ffdede)',
                paddingLeft: '40px',
                paddingRight: '40px'
            }}
        >
            <h2 className='text-lg font-bold text-white mb-4'>毎週のおすすめメニュー</h2>
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
                    {recommendedDishes.map((dish, index) => (
                        <div
                            key={index}
                            className='bg-white p-4 rounded-lg shadow-md flex flex-col min-w-[300px] relative cursor-pointer'
                            onClick={() => handleDishClick(dish)}
                        >
                            {/* Ngày hiển thị ở góc trên bên phải */}
                            <div className='absolute top-2 right-2 text-xl font-bold text-red-500'>
                                {dish.day}
                            </div>

                            <div className='w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4'>
                                <img src={dish.image} alt={dish.name} className='w-full h-full object-cover' />
                            </div>

                            <div className='text-sm font-bold'>{dish.name}</div>
                            <div className='text-xs text-gray-500'>{dish.deliveryTime}</div>
                            <div className='flex flex-wrap gap-1 mt-2'>
                                {dish.ingredients.map((ingredient, i) => (
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
