import React from 'react';
import HighRatedDishes from './HighRatedDishes';
import RecommendedMenu from './Recommended';
import PopularDishes from './PopularDishes';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
    const { t } = useTranslation('homepage');
    return (
        <div className='w-full bg-gray-50'>
            <Helmet>
                <title>{t('homepage')} - EZLunch</title>
            </Helmet>
            <div className='max-w-screen-xl mx-auto w-full'>
                <div className='flex items-center py-8 px-4'>
                    <p className='text-red-500 font-bold text-xl flex-grow'>{t('greeting')}</p>
                    <button
                        className='px-4 py-2 rounded-lg text-black font-bold bg-gradient-to-r from-pink-100 to-red-500 hover:from-red-500 hover:to-red-700 shadow-md transition-all'
                        onClick={() => alert('カスタマイズを選択しました！')}
                    >
                        {t('customizeMenu')}
                    </button>
                </div>

                <section className='py-8 px-4'>
                    <HighRatedDishes />
                </section>

                <section className='py-8 px-4'>
                    <RecommendedMenu/>
                </section>

                <section className='py-8 px-4'>
                    <PopularDishes/>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
