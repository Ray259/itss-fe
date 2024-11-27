import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate username validation
    if (username === "バカあほ") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
      // Simulate form submission
      alert("登録が完了しました");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-xl font-semibold">アカウント登録</h2>
        <form onSubmit={handleSubmit} id="registration-form">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">ユーザー名</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameError && (
              <small className="text-red-500 text-xs mt-1 block">ユーザー名が已經使用されています</small>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">メール</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">パスワード</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium">パスワード確認</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordMismatch && (
            <div className="text-red-500 text-xs mb-4">パスワードが一致していません</div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            登録
          </button>
          <p className="text-center mt-4 text-sm">
            すでにアカウントをお持ちですか？ <a href="login.html" className="text-blue-500 hover:underline">ログイン</a>
          </p>
        </form>
      </div>
    </div>
  );
}
