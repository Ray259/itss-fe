import React, { useState, useContext } from 'react';
import toggleButton from '../assets/img/toggle btn.svg';
import SearchBar from './SearchBar';
import defaultAvatar from '@assets/img/default-avatar.png';
import { AuthContext } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    toggleSidebar: () => void;
    isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);
    const { t } = useTranslation();
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className='w-full z-10 h-24 shadow-md flex items-center justify-between px-4 bg-gray-100 dark:bg-gray-800 dark:shadow-lg'>
            <div>
                <img
                    onClick={toggleSidebar}
                    src={toggleButton}
                    className='w-28 mt-6 cursor-pointer dark:filter dark:brightness-90'
                    alt='Toggle Sidebar'
                />
            </div>
            <div className='w-4/5 max-w-lg mx-auto'>
                <SearchBar />
            </div>

            {user ? (
                <div className='relative flex items-center space-x-2'>
                    <div
                        className='text-red-500 text-center cursor-pointer dark:text-red-400'
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {user.display_name}
                    </div>
                    <img
                        src={user.avatar_url || defaultAvatar}
                        className='w-11 h-11 rounded-md border-2 border-red-400 cursor-pointer dark:border-red-500'
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className='absolute right-0 mt-20 z-10 w-48 bg-gray-100 border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                            <button
                                className='block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700'
                                onClick={() => {
                                    logout();
                                    setShowDropdown(false);
                                    navigate('/login');
                                }}
                            >
                                {t('logout')}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex items-center space-x-4'>
                    <button
                        className='px-4 py-2 rounded-lg text-gray-900 font-bold bg-gradient-to-r from-pink-100 to-red-500 hover:from-red-500 hover:to-red-700 shadow-md transition-all dark:text-gray-100 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-900'
                        onClick={() => navigate('/login')}
                    >
                        {t('login')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
