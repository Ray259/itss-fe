import React, { useState, useContext } from 'react';
import toggleButton from '../assets/img/toggle btn.svg';
import SearchBar from './SearchBar';
import { getLocalUser } from '@/utils/auth';
import defaultAvatar from '@assets/img/default-avatar.png';
import { AuthContext } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
    toggleSidebar: () => void;
    isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { logout } = useContext(AuthContext);
    const { t } = useTranslation();
    const user = getLocalUser();
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className='w-full z-10 h-24 bg-white shadow-md flex items-center justify-between px-4'>
            <div>
                <img onClick={toggleSidebar} src={toggleButton} className='w-28 mt-6 cursor-pointer' />
            </div>
            <div className='w-4/5 max-w-lg mx-auto'>
                <SearchBar />
            </div>

            {user ? (
                <div className='relative flex items-center space-x-2'>
                    <div
                        className='text-red-500 text-center cursor-pointer'
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {user.display_name}
                    </div>
                    <img
                        src={user.avatar_url || defaultAvatar}
                        className='w-11 h-11 rounded-md border-2 border-red-400 cursor-pointer'
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                        <div className='absolute right-0 mt-20 z-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                            <button
                                className='block w-full text-left px-4 py-2 text-black hover:bg-gray-100'
                                onClick={() => {
                                    logout();
                                    setShowDropdown(false);
                                    window.location.href = '/login';
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
                        className='px-4 py-2 rounded-lg text-black font-bold bg-gradient-to-r from-pink-100 to-red-500 hover:from-red-500 hover:to-red-700 shadow-md transition-all'
                        onClick={() => (window.location.href = '/login')}
                    >
                        {t('login')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
