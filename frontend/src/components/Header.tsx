import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Firebase 初期化ファイルからauthをインポート
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 現在のユーザーを取得
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // ユーザーがログインしている場合に設定
      } else {
        setUser(null); // ログインしていない場合
      }
    });

    // コンポーネントがアンマウントされた時にサブスクリプションを解除
    return () => unsubscribe();
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>{user.displayName ? user.displayName : user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            ログイン
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
