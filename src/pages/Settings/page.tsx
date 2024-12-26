
import React, { useState } from "react";

const SettingsPage = () => {
  // State quản lý cài đặt
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [value, setValue] = useState(50); // Giá trị mặc định

  const handleRangeChange = (e) => {
    setValue(e.target.value); // Cập nhật giá trị khi người dùng kéo
  };
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 flex-grow">
        {/* Section Title */}
        <h1 className="text-center text-red-500 text-2xl font-bold mb-8">設定</h1>

        {/* General Settings */}
        <section className="mb-12">
          <h2 className="text-orange-500 text-xl font-bold mb-4">一般</h2>
          <div className="space-y-4">
          <div className="grid grid-cols-12 items-center gap-4">
  <label className="col-span-1 text-gray-700 text-right">ユーザー名</label>
  <input
    type="text"
    placeholder="バカあほ"
    className="col-span-11 border border-orange-500 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
</div>


<div className="grid grid-cols-12 items-center gap-4">
  <label className="col-span-1 text-gray-700 text-right">パスワード</label>
  <input
    type="text"
    placeholder="〇〇〇〇"
    className="col-span-11 border border-orange-500 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
</div>
            <div className="flex items-center gap-3 ml-8">
              <label className="text-gray-500">ダークモード</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-all duration-300 ${
                    isDarkMode ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      isDarkMode ? "translate-x-5" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>
            <div className="grid grid-cols-12 items-center gap-4">
  <label className="col-span-1 text-gray-700 text-right">言語</label>
  <input
    type="text"
    placeholder="日本語"
    className="col-span-11 border border-orange-500 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
  />
</div>
<div className="grid grid-cols-12 items-center gap-4 ml-7">
      <label className="col-span-1 block text-gray-700">字サイズ</label>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={handleRangeChange}
        className="col-span-11 w-full appearance-none h-2 rounded-full"
        style={{
          background: `linear-gradient(to right, #FF6A00 0%, #FF6A00 ${value}%, #F3F4F6 ${value}%, #F3F4F6 100%)`,
        }}
      />
    </div>
            <div className="flex items-center gap-3  ml-7">
              <label className="text-gray-500">通知</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isNotificationEnabled}
                  onChange={toggleNotification}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-all duration-300 ${
                    isNotificationEnabled ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      isNotificationEnabled ? "translate-x-5" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Recommended Settings */}
        <section>
          <h2 className="text-orange-500 text-xl font-bold mb-4">おすすめ設定</h2>
          <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <label className="text-gray-500 w-32">好きな味</label>
        <input
          id="favoriteTaste"
          type="text"
          className="flex-1 border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="例: 辛い、甘い"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-gray-500 w-32" htmlFor="dislikedTaste">苦手な味</label>
        <input
          id="dislikedTaste"
          type="text"
          className="flex-1 border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="例: 苦い、酸っぱい"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-gray-500 w-32" htmlFor="location">場所</label>
        <input
          id="location"
          type="text"
          className="flex-1 border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="例: No.1 Dai Co Viet St, Hai Ba Trung, Ha Noi"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-gray-500 w-32" htmlFor="favoriteCuisine">好きな料理</label>
        <input
          id="favoriteCuisine"
          type="text"
          className="flex-1 border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="例: ベトナム料理、日本料理、中華料理"
        />
      </div>
    </div>
        </section>

        {/* Buttons */}
        <div className="mt-8 space-y-4 mb-6">
          <div className="flex justify-center space-x-4">
            <button className="border border-gray-500 text-gray-500 px-6 py-2 rounded-md">
              キャンセル
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md">
              保存
            </button>
          </div>
          <div className="flex justify-center">
            <button className="bg-purple-500 text-white px-8 py-3 rounded-full">
              ログアウト
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
