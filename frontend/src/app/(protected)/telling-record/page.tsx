"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getTellingRecords, getChild, getUserBooks } from "@/lib/api";
import { ChildFormData, TellingRecord, Book } from "@/types";
import { Plus, Edit, Home } from "lucide-react";
import Loading from "@/components/Loading";

export default function TellingRecordPage() {
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [children, setChildren] = useState<ChildFormData[]>([]);
  const [tellingRecords, setTellingRecords] = useState<TellingRecord[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const token = await user.getIdToken();
      try {
        const [childrenData, recordsData, booksData] = await Promise.all([
          getChild(token),
          getTellingRecords(token),
          getUserBooks(token),
        ]);

        setChildren(childrenData);
        setBooks(booksData);
        setTellingRecords(recordsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const getChildName = (childId: number) => {
    const child = children.find((c) => c.id === childId);
    return child?.name || "Unknown";
  };

  const getBookTitle = (bookId: number | null) => {
    if (!bookId) return "未選択";
    const book = books.find((b) => b.id === bookId);
    return book?.title || "Unknown";
  };

  const filteredRecords = selectedChildId
    ? tellingRecords.filter((record) => record.child === selectedChildId)
    : tellingRecords;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          真実告知の記録
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <label
                htmlFor="childSelect"
                className="block text-xl font-medium text-orange-600 mb-2 font-comic"
              >
                お子さんを選択:
              </label>
              <select
                id="childSelect"
                value={selectedChildId || ""}
                onChange={(e) => setSelectedChildId(Number(e.target.value))}
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg"
              >
                <option value="">選択してください</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => router.push("/telling-record/input")}
              className="ml-4 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 font-comic hover:scale-105"
            >
              <Plus size={20} />
              新規登録
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-orange-200">
                  <th className="px-4 py-3 text-left font-comic text-orange-600">
                    告知日
                  </th>
                  <th className="px-4 py-3 text-left font-comic text-orange-600">
                    使用した絵本
                  </th>
                  <th className="px-4 py-3 text-right font-comic text-orange-600">
                    記録の詳細
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-4 py-4 font-comic">
                      {new Date(record.telling_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 font-comic">
                      {getBookTitle(record.book)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() =>
                          router.push(`/telling-record/${record.id}`)
                        }
                        className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 font-comic hover:scale-105 ml-auto"
                      >
                        <Edit size={16} />
                        詳細
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ホームに戻るボタン */}
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
  );
}
