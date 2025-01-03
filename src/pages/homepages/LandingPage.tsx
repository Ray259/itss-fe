import React from 'react';
import HighRatedDishes from './HighRatedDishes';
import PopularDishes from './PopularDishes';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
    const { t } = useTranslation('homepage');
    return (
        <div className='w-full bg-gray-50 dark:bg-gray-900'>
            <div className='max-w-screen-xl mx-auto w-full'>
                <div className='flex items-center py-8 px-4'>
                    <p className='text-red-500 dark:text-red-100 font-bold text-xl flex-grow'>{t('greeting')}</p>
                    <button
                        className='px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300 font-bold bg-gradient-to-r from-red-500 to-pink-100 dark:from-gray-700 dark:to-red-500 hover:from-red-500 hover:to-red-700 dark:hover:from-red-600 dark:hover:to-red-400 shadow-md transition-all'
                        onClick={() => alert('カスタマイズを選択しました！')}
                    >
                        {t('customizeMenu')}
                    </button>
                </div>

                <section className='py-8 px-4'>
                    <HighRatedDishes />
                </section>
                <section className='py-8 px-4'>
                    <PopularDishes/>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
