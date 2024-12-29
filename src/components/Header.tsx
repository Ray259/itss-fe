import React from 'react';
import toggleButton from '../assets/img/toggle btn.svg';
import SearchBar from './SearchBar';
import { getLocalUser } from '@/utils/auth';

interface HeaderProps {
    toggleSidebar: () => void;
    isVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const user = getLocalUser();
    console.log(user);
    return (
        <div className='w-full z-10 h-24 bg-white shadow-md flex items-center justify-between px-4'>
            <div>
                <img onClick={toggleSidebar} src={toggleButton} className='w-28 mt-6 cursor-pointer' />
            </div>
            <div className='w-4/5 max-w-lg mx-auto'>
                <SearchBar />
            </div>

            {/* TODO */}
            <div className='flex items-center space-x-4'>
                <div className='w-11 h-11 bg-gray-300 rounded-md'></div>
            </div>
        </div>
    );
};

export default Header;
