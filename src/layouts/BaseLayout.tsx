import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '@components/SideBar';
import Footer from '@components/Footer';
import Header from '@components/Header';

const BaseLayout: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className='relative min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} isVisible={isSidebarVisible} />

            <div className='relative flex flex-grow'>
                {/* Sidebar */}
                <div
                    className={`z-10 absolute top-0 left-0 w-64 h-full shadow-lg md:w-1/4 lg:w-1/5 transition-transform duration-300 ${
                        isSidebarVisible ? 'transform translate-x-0' : 'transform -translate-x-full'
                    }`}
                >
                    <SideBar isVisible={isSidebarVisible} />
                </div>

                {/* Main Content */}
                <div className='flex-grow p-4 min-h-screen dark:bg-gray-900 shadow-md'>
                    <Outlet />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BaseLayout;
