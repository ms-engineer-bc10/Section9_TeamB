"use client";
import React, { useEffect, useState } from "react";
import { getUserBooks, createCheckoutSession } from "@/lib/api";
import { auth } from "@/lib/firebase";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { Book, Star, ArrowRight } from "lucide-react";

const LightPlan = () => {
  const [hasBooks, setHasBooks] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const books = await getUserBooks(token);
          setHasBooks(books.length > 0);
        }
      } catch (error) {
        console.error("Failed to fetch user books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCheckout = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("ユーザーがログインしていません");
        return;
      }

      const token = await currentUser.getIdToken();
      const data = await createCheckoutSession(token);

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("エラー:", data.error);
      }
    } catch (error) {
      console.error("リクエストが失敗しました:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float"></div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
            絵本を作成する
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl py-8 px-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Book className="text-orange-500 mr-2" size={32} />
                <h2 className="text-2xl font-bold text-orange-600 font-comic">
                  ライトプラン
                </h2>
              </div>
              <p className="text-center text-gray-600 mb-6 font-comic">
                1回限りの無料お試し作成
              </p>
              <button
                onClick={() => router.push("/children/input")}
                disabled={hasBooks}
                className={`w-full py-3 px-4 rounded-full font-bold text-lg font-comic transition-all duration-300 flex items-center justify-center ${
                  hasBooks
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {hasBooks ? (
                  "作成済み"
                ) : (
                  <>
                    絵本を作る <ArrowRight className="ml-2" size={20} />
                  </>
                )}
              </button>
              {hasBooks && (
                <p className="text-sm text-gray-500 mt-2 text-center font-comic">
                  お試し作成は既に利用済みです
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl py-8 px-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Star className="text-yellow-500 mr-2" size={32} />
                <h2 className="text-2xl font-bold text-orange-600 font-comic">
                  スタンダードプラン
                </h2>
              </div>
              <p className="text-center text-gray-600 mb-6 font-comic">
                980円で10回の絵本作成
              </p>
              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 bg-yellow-500 text-white rounded-full font-bold text-lg font-comic hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center"
              >
                アップグレード <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/home")}
              className="bg-white text-orange-600 px-6 py-3 rounded-full hover:bg-orange-100 focus:outline-none shadow-md transition-all transform hover:scale-105 font-comic text-lg inline-flex items-center"
            >
              <Home className="mr-2" size={20} />
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LightPlan;
