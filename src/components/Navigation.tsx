import React from 'react';

const Navigation: React.FC = () => {
    return (
        <nav className='fixed bottom-0 left-0 w-full bg-gray-100 shadow-inner flex justify-between px-6 py-3 dark:bg-gray-800 dark:shadow-md'>
            <button className='text-xl text-orange-500 dark:text-orange-400'>🏠</button>
            <button className='text-xl text-gray-500 dark:text-gray-300'>💬</button>
            <button className='text-xl text-gray-500 dark:text-gray-300'>❤️</button>
            <button className='text-xl text-gray-500 dark:text-gray-300'>👤</button>
        </nav>
    );
};

export default Navigation;
