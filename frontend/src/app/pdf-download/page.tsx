"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChild } from "@/lib/api";
import DownloadPdf from "@/components/DownloadPdf";
import { Book, Home, Download } from "lucide-react";

interface Child {
  id: number;
  name: string;
}

export default function BookDownloadPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        // 実際の認証トークン取得ロジックに合ってるか確認
        const authToken = "YOUR_AUTH_TOKEN_HERE";
        setToken(authToken);
        const fetchedChildren = await getChild(authToken);
        setChildren(fetchedChildren);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          絵本のダウンロード
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <label
            htmlFor="childSelect"
            className="block text-xl font-medium text-orange-600 mb-3 font-comic"
          >
            お子さんを選択:
          </label>
          <div className="relative">
            <select
              id="childSelect"
              value={selectedChildId || ""}
              onChange={(e) => setSelectedChildId(Number(e.target.value))}
              className="block w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent sm:text-lg font-comic appearance-none"
            >
              <option value="">選択してください</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-600">
              <svg
                className="fill-current h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {selectedChildId && token && (
            <div className="mt-6">
              <DownloadPdf token={token} childId={selectedChildId} />
            </div>
          )}
        </div>

        <div className="text-center">
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
  );
}
