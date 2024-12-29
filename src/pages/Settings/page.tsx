import { useState, useEffect } from "react";
import { getUserInfo, updateUser } from "@/api/user-info.api";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import LanguageSetting from '@/components/LanguageSetting';
import { Helmet } from "react-helmet-async";
import DarkModeSetting from '@/components/DarkModeSetting';

const SettingsPage = () => {
  const { t, i18n } = useTranslation('settings');
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const user = await getUserInfo();
      setUserData(user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  const onSubmit = async () => {
    if (!userData?.id) return;
    try {
      const response = await updateUser(userData?.id, userData);
      console.log("Response from API:", response);
      alert(t('save'));
    } catch (error) {
      console.error("Failed to update user:", error);
      alert(t('updateFailed'));
    }
  }
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      <Helmet>
        <title>{t('settings')} - EZLunch </title>
      </Helmet>
      <main className="w-full lg:w-3/4 mx-auto px-4 mt-8 flex-grow">
        <h1 className="text-center text-red-500 dark:text-red-400 text-2xl font-bold mb-8">{t('settings')}</h1>

        <section className="mb-12">
          <h2 className="text-orange-500 dark:text-orange-400 text-xl font-bold mb-4">{t('general')}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200">{t('username')}</label>
              <input
                type="text"
                placeholder={t('usernamePlaceholder')}
                value={userData?.display_name}
                onChange={(e) => setUserData({ ...userData, display_name: e.target.value })}
                className="col-span-5 border border-orange-500 dark:border-orange-400 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200">{t('password')}</label>
              <input
                type="text"
                placeholder={t('passwordPlaceholder')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-5 border border-orange-500 dark:border-orange-400 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200">{t('darkMode')}</label>
              <div className='col-span-5'>
                <DarkModeSetting />
              </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200">{t('language')}</label>
              <div className="col-span-5">
                <LanguageSetting value={i18n.language} />
              </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200">{t('fontSize')}</label>
              <div className="col-span-5 flex items-center">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={userData?.font_size || 14}
                  onChange={(e) => setUserData({ ...userData, font_size: parseInt(e.target.value) })}
                  className="w-full appearance-none h-2 rounded-full"
                  style={{
                    background: `linear-gradient(to right, #FF6A00 0%, #FF6A00 ${userData?.font_size ? userData?.font_size * 2 : 28}%, #F3F4F6 ${userData?.font_size ? userData?.font_size : 28}%, #F3F4F6 100%)`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="text-gray-700 dark:text-gray-200">{t('notifications')}</label>
              <label className="col-span-5 relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={userData?.notification}
                  onChange={() => setUserData({ ...userData, notification: !userData?.notification })}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-all duration-300 ${
                    userData?.notification ? "bg-orange-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-gray-100 rounded-full transition-transform duration-300 ${
                      userData?.notification ? "translate-x-5" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-orange-500 dark:text-orange-400 text-xl font-bold mb-4">{t('recommendedSettings')}</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200">{t('favoriteTaste')}</label>
              <div className="col-span-5">
                <input
                  id="favoriteTaste"
                  type="text"
                  value={userData?.loved_flavor?.join(", ")}
                  onChange={(e) => setUserData({ ...userData, loved_flavor: e.target.value.split(", ") })}
                  className="flex-1 w-full border border-red-400 dark:border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  placeholder={t('favoriteTastePlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200 w-32" htmlFor="dislikedTaste">{t('dislikedTaste')}</label>
              <div className="col-span-5">
                <input
                  id="dislikedTaste"
                  type="text"
                  value={userData?.hated_flavor?.join(", ")}
                  onChange={(e) => setUserData({ ...userData, hated_flavor: e.target.value.split(", ") })}
                  className="flex-1 w-full border border-red-400 dark:border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  placeholder={t('dislikedTastePlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200 w-32" htmlFor="location">{t('location')}</label>
              <div className="col-span-5">
                <input
                  id="location"
                  type="text"
                  value={userData?.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  className="flex-1 w-full border border-red-400 dark:border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  placeholder={t('locationPlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700 dark:text-gray-200 w-32" htmlFor="favoriteCuisine">{t('favoriteCuisine')}</label>
              <div className="col-span-5">
                <input
                  id="favoriteCuisine"
                  type="text"
                  value={userData?.loved_dish?.join(", ")}
                  onChange={(e) => setUserData({ ...userData, loved_dish: e.target.value.split(", ") })}
                  className="flex-1 w-full border border-red-400 dark:border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  placeholder={t('favoriteCuisinePlaceholder')}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 space-y-4 mb-6">
          <div className="flex justify-center space-x-4">
            <button className="border border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400 px-6 py-2 rounded-md"
              onClick={() => navigate(-1)}
            >
              {t('cancel')}
            </button>
            <button className="bg-red-500 dark:bg-red-400 text-gray-100 dark:text-gray-900 px-6 py-2 rounded-md"
              onClick={onSubmit}
            >
              {t('save')}
            </button>
          </div>
          <div className="flex justify-center">
            <button className="bg-purple-500 dark:bg-purple-400 text-gray-100 dark:text-gray-900 px-8 py-3 rounded-full"
              onClick={() => navigate("/login")}
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;