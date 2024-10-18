"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PenTool, Book, MessageCircle, LogOut, Star } from "lucide-react";
import { fetchMembershipStatus, getChild } from "@/lib/api";
import { handleLogout } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [children, setChildren] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        const data = await getChild(token);
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children data:", error);
      }
    };

    const fetchMembership = async () => {
      try {
        if (user) {
          const token = await user.getIdToken();
          const membershipData = await fetchMembershipStatus(token);
          setMembershipStatus(membershipData.status);
          fetchData(token);
        }
      } catch (error) {
        console.error("Error fetching token or membership status:", error);
      }
    };

    fetchMembership();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-beige-100 text-orange-900 py-8 px-4 relative overflow-hidden">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8 relative z-10">
        {/* ヘッダーのオレンジの丸 */}
        <div className="absolute top-5 -left-10 w-32 h-32 bg-orange-300 rounded-full opacity-50 animate-pulse"></div>
        <h1 className="text-5xl font-bold text-orange-600 font-comic">
          Tellry
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-white px-3 py-1 rounded-full shadow-md">
            {user?.email || "user@example.com"}
          </span>
          <button
            onClick={() => handleLogout(router)}
            className="bg-orange-600 text-white p-3 rounded-full hover:bg-orange-700 transition-transform transform hover:scale-110 shadow-lg"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 transform hover:scale-105 transition-transform">
          <h2 className="text-3xl font-semibold mb-4 font-comic">
            ようこそ、{user?.email?.split("@")[0]}さん！
          </h2>
          <p className="mb-2">
            会員ステータス:{" "}
            <span className="font-semibold text-orange-600 bg-yellow-200 px-2 py-1 rounded-full">
              {membershipStatus === "standard"
                ? "スタンダード"
                : membershipStatus === "light"
                ? "ライト"
                : "ステータスを取得中..."}
            </span>
          </p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 font-comic">
              登録されているお子様:
            </h3>
            <ul className="list-none">
              {children.map((child, index) => (
                <li
                  key={index}
                  className="inline-block bg-orange-200 rounded-full px-3 py-1 mr-2 mb-2"
                >
                  <Link
                    href={`/home/children/${child.id}`}
                    className="text-orange-600 hover:underline"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/mypage"
            className="text-orange-600 hover:underline font-comic"
          >
            メールアドレスの変更
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/plan"
            className="bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white rounded-2xl p-6 text-center transition-all transform hover:scale-105 hover:rotate-2 shadow-lg"
          >
            <PenTool size={64} className="mx-auto mb-4 animate-bounce" />
            <span className="text-2xl font-bold font-comic">絵本を作る</span>
          </Link>

          <Link
            href="/pdf-download"
            className="bg-gradient-to-br from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white rounded-2xl p-6 text-center transition-all transform hover:scale-105 hover:rotate-2 shadow-lg"
          >
            <Book size={64} className="mx-auto mb-4 animate-wiggle" />
            <span className="text-2xl font-bold font-comic">
              作った絵本を見る
            </span>
          </Link>

          <Link
            href="/tellingRecord"
            className="bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-2xl p-6 text-center transition-all transform hover:scale-105 hover:rotate-2 shadow-lg"
          >
            <MessageCircle size={64} className="mx-auto mb-4 animate-pulse" />
            <span className="text-2xl font-bold font-comic">
              子供の反応を記録
            </span>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold font-comic text-orange-600 mb-4">
            絵本作成状況
          </h2>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">作成済み</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600">2</div>
              <div className="text-sm text-gray-600">残り</div>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Star
                  key={index}
                  className={`w-8 h-8 ${
                    index < 3 ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto mt-12 text-center text-sm text-orange-700 relative z-10">
        <p className="font-comic">&copy; 2024 Tellry. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
