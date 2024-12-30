import React from 'react';
import { useTranslation } from 'react-i18next';

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className='inline-flex items-center px-4 py-1 bg-red-400 text-gray-100 font-semibold rounded-xl dark:bg-red-600'>
        {children}
    </span>
);

const Categories: React.FC<{ categories: string[] }> = ({ categories }) => {
    const { t } = useTranslation('details');
    return (
        <div className='px-4 dark:bg-gray-900 rounded-lg'>
            <h2 className='p-2 text-xl text-red-600 font-semibold dark:text-red-400'>{t('categories')}</h2>
            <div className='p-2 flex flex-wrap min-h-40 items-start gap-2 shadow-md rounded-lg border border-gray-300 dark:border-gray-700 dark:shadow-sm'>
                {categories.map((category, index) => (
                    <Tag key={index}>{category}</Tag>
                ))}
            </div>
        </div>
    );
};

export default Categories;
