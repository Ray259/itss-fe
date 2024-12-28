import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { searchDishes } from '@/api/food-details.api';
import { useTranslation } from 'react-i18next';

const SearchBar: React.FC = () => {
    const { t } = useTranslation('common');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{ id: number; name: string }[]>([]);

    const navigate = useNavigate();

    const handleSearch = async (value: string) => {
        setLoading(true);
        setQuery(value);

        if (!value) {
            setResults([]);
            setLoading(false);
            return;
        }

        try {
            // Gọi API thực tế thông qua searchDishes
            const data = await searchDishes(value, 1, 10); // page = 1, per_page = 10
            setResults(data.data.map((item: any) => ({ id: item.id, name: item.name }))); // Lấy danh sách tên món ăn
        } catch (error) {
            console.error('Error fetching search results:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (id: number) => {
        if (!id) {
            console.error('Invalid ID:', id);
            return;
        }
        setResults([]);
        navigate(`/food-details/${id}`);
    };

    return (
        <div className='relative w-full p-4 z-10' onClick={() => setResults([])}>
            <div
                className='flex items-center w-4/5 max-w-lg mx-auto px-4 py-2 rounded-md border border-gray-300 bg-white'
                onClick={(e) => e.stopPropagation()}
            >
                <MagnifyingGlassIcon className='h-5 w-5 text-gray-500 mr-3' />
                <input
                    type='text'
                    placeholder={t('search')}
                    className='flex-grow outline-none'
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            {loading && <p className='mt-2 text-black-500'>読み込み中...</p>}
            {results.length > 0 && (
                <div
                    className='absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 max-w-lg bg-white border border-gray-300 rounded shadow-lg z-50'
                    style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                    {results.map((result) => (
                        <div
                            key={result.id}
                            className='p-2 hover:bg-gray-100 cursor-pointer'
                            onClick={() => handleSelect(result.id)}
                        >
                            {result.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
