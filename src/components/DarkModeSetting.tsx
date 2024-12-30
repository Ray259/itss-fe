import React from 'react';
import { useDarkMode } from '@/contexts/DarkModeContext';

const DarkModeSetting: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <label className="col-span-5 relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <div
        className={`w-11 h-6 rounded-full transition-all duration-300 ${
          darkMode ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-gray-100 rounded-full transition-transform duration-300 ${
            darkMode ? "translate-x-5" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default DarkModeSetting;
