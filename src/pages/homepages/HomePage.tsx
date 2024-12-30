import React from 'react';
import HighRatedDishes from './HighRatedDishes';
import RecommendedMenu from './Recommended';
import PopularRestaurant from './PopularRestaurants';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
    const { t } = useTranslation('homepage');
    return (
        <div className='w-full bg-gray-50 dark:bg-gray-900'>
            <Helmet>
                <title>{t('homepage')} - EZLunch</title>
            </Helmet>
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

                {/* Bao bọc các phần HighRatedDishes và RecommendedMenu bằng thẻ div với nền đỏ */}
                <div className='bg-[#FF0000] py-8'
                     style={{ borderRadius: '15px' }}
                    >
                    <section className='py-8 px-4'>
                        <HighRatedDishes />
                    </section>

                    <section className='py-8 px-4'>
                        <RecommendedMenu />
                    </section>
                </div>

                <section className='py-8 px-4'>
                    <PopularRestaurant  />
                </section>
            </div>
        </div>
    );
};

export default HomePage;
