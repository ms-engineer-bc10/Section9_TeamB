"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Firebase 初期化ファイルからauthをインポート
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      router.push("/login");
    } catch (error) {
      console.error("ログアウトに失敗しました:", error);
    }
  };

  return (
    <header className="shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-lg font-bold text-orange-700">
          <Link href={"/home"}>Tellry</Link>
        </h1>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>{user.displayName ? user.displayName : user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-300 transition-colors duration-200"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-300 transition-colors duration-200"
            >
              ログイン
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
