import React from 'react';
import ImageSlider from '@components/ImageSlider';

const FoodImages: React.FC<{ images: string[] }> = ({ images }) => (
    <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
        <ImageSlider images={images} />
    </div>
);

export default FoodImages;
