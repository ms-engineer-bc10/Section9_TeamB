"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PenTool, Book, MessageCircle, LogOut } from "lucide-react";
import { auth } from "@/lib/firebase";
import { fetchMembershipStatus, getChild } from "@/lib/api";
import { handleLogout, useRedirectIfNotAuthenticated } from "@/lib/auth";

const Home = () => {
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        const data = await getChild(token);
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const membershipData = await fetchMembershipStatus(token);
          setMembershipStatus(membershipData.status);
          fetchData(token);
        } catch (error) {
          console.error("Error fetching token or membership status:", error);
          setLoading(false);
        }
      } else {
        console.error("User is not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useRedirectIfNotAuthenticated();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-orange-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-beige-100 text-orange-900 py-8 px-4 relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-beige-200 rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-20 bg-beige-300 rounded-full opacity-50 transform -skew-x-6 animate-float"></div>

      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-5xl font-bold text-orange-600 font-comic">
          Tellry
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-white px-3 py-1 rounded-full shadow-md">
            {auth.currentUser?.email || "user@example.com"}
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
            ようこそ、{auth.currentUser?.email?.split("@")[0]}さん！
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
            href="/children"
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
      </main>

      <footer className="max-w-4xl mx-auto mt-12 text-center text-sm text-orange-700 relative z-10">
        <p className="font-comic">&copy; 2024 Tellry. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
