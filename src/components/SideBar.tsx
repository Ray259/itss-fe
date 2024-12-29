import React from 'react';
import { NavLink } from 'react-router-dom';
import sidebarItems from '@configs/sidebarItems';

interface SideBarProps {
    isVisible: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isVisible }) => {
    return (
        <div
            className={`h-full w-[386px] opacity-95 bg-gradient-to-r from-[#ff8486] to-[#ffd1d1] dark:from-gray-700 dark:to-gray-900 shadow transform transition-transform duration-300 ease-in-out z-40 ${
                isVisible ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className='flex flex-col p-4'>
                {sidebarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center mb-4 p-3 rounded-md ${
                                isActive
                                    ? 'bg-[#ffd1d1] dark:bg-gray-800'
                                    : 'hover:bg-[#ffe4e4] dark:hover:bg-gray-700'
                            }`
                        }
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        {item.icon && <item.icon className='w-6 h-6 mr-4' />}
                        <span className="dark:text-gray-30 text-base font-['Roboto']">
                            {item.label}
                        </span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
