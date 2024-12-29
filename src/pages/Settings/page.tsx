import { useState, useEffect } from "react";
import { getUserInfo, updateUser } from "@/api/user-info.api";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import LanguageSetting from '@/components/LanguageSetting';
import { Helmet } from "react-helmet-async";

const SettingsPage = () => {
  const { t, i18n } = useTranslation('settings');
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const user = await getUserInfo();
      if (!user.phone) {
        user.phone = "";
      }
      if (user.language) {
        i18n.changeLanguage(user.language);
      }
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
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>{t('settings')} - EZLunch </title>
      </Helmet>
      <main className="w-full lg:w-3/4 mx-auto px-4 mt-8 flex-grow">
        <h1 className="text-center text-red-500 text-2xl font-bold mb-8">{t('settings')}</h1>

        <section className="mb-12">
          <h2 className="text-orange-500 text-xl font-bold mb-4">{t('general')}</h2>
          <div className="space-y-4">
          <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700">{t('username')}</label>
              <input
                type="text"
                placeholder={t('usernamePlaceholder')}
                value={userData?.display_name}
                onChange={(e) => setUserData({ ...userData, display_name: e.target.value })}
                className="col-span-5 border border-orange-500 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700">{t('avatar_url')}</label>
              <input
                type="text"
                placeholder={t('avatarPlaceholder')}
                value={userData?.avatar_url}
                onChange={(e) => setUserData({ ...userData, avatar_url: e.target.value })}
                className="col-span-5 border border-orange-500 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700">{t('password')}</label>
              <input
                type="text"
                placeholder={t('passwordPlaceholder')}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-5 border border-orange-500 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-500">{t('darkMode')}</label>
              <label className="col-span-5 relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={userData?.dark_mode}
                  onChange={() => setUserData({ ...userData, dark_mode: !userData?.dark_mode })}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-all duration-300 ${
                    userData?.dark_mode ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      userData?.dark_mode ? "translate-x-5" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700">{t('language')}</label>
              <div className="col-span-5">
                <LanguageSetting value={userData?.language || 'ja'} onChange={(value) => setUserData({ ...userData, language: value })} />
              </div>
            </div>

            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-700">{t('fontSize')}</label>
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
              <label className="text-gray-500">{t('notifications')}</label>
              <label className="col-span-5 relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={userData?.notification}
                  onChange={() => setUserData({ ...userData, notification: !userData?.notification })}
                />
                <div
                  className={`w-11 h-6 rounded-full transition-all duration-300 ${
                    userData?.notification ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                      userData?.notification ? "translate-x-5" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-orange-500 text-xl font-bold mb-4">{t('recommendedSettings')}</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-500">{t('favoriteTaste')}</label>
              <div className="col-span-5">
                <input
                  id="favoriteTaste"
                  type="text"
                  value={userData?.loved_flavor?.join(", ")}
                  onChange={(e) => setUserData({ ...userData, loved_flavor: e.target.value.split(", ") })}
                  className="flex-1 w-full border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder={t('favoriteTastePlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-500 w-32" htmlFor="dislikedTaste">{t('dislikedTaste')}</label>
              <div className="col-span-5">
                <input
                  id="dislikedTaste"
                  type="text"
                  value={userData?.hated_flavor?.join(", ")}
                  onChange={(e) => setUserData({ ...userData, hated_flavor: e.target.value.split(", ") })}
                  className="flex-1 w-full border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder={t('dislikedTastePlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-500 w-32" htmlFor="location">{t('location')}</label>
              <div className="col-span-5">
                <input
                  id="location"
                  type="text"
                  value={userData?.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  className="flex-1 w-full border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder={t('locationPlaceholder')}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label className="col-span-1 text-gray-500 w-32" htmlFor="favoriteCuisine">{t('favoriteCuisine')}</label>
              <div className="col-span-5">
                <input
                  id="favoriteCuisine"
                  type="text"
                  value={userData?.loved_dish?.join(", ")}
                  onChange={(e) => setUserData({ ...userData, loved_dish: e.target.value.split(", ") })}
                  className="flex-1 w-full border border-red-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder={t('favoriteCuisinePlaceholder')}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 space-y-4 mb-6">
          <div className="flex justify-center space-x-4">
            <button className="border border-gray-500 text-gray-500 px-6 py-2 rounded-md"
              onClick={() => navigate(-1)}
            >
              {t('cancel')}
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md"
              onClick={onSubmit}
            >
              {t('save')}
            </button>
          </div>
          <div className="flex justify-center">
            <button className="bg-purple-500 text-white px-8 py-3 rounded-full"
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