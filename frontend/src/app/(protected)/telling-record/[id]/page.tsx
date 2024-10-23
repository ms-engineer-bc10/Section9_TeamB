"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  getChildId,
  getUserBooks,
  getTellingRecords,
  updateTellingRecord,
  deleteTellingRecord,
} from "@/lib/api";
import { Book, ChildFormData, TellingRecord } from "@/types";
import { calculateAge } from "@/utils/dateFormat";
import { Home, Save, Trash } from "lucide-react";
import Loading from "@/components/Loading";

interface PageProps {
  params: {
    id: string;
  };
}

export default function TellingRecordDetail({ params }: PageProps) {
  const [record, setRecord] = useState<TellingRecord | null>(null);
  const [child, setChild] = useState<ChildFormData | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const token = await user.getIdToken();
      try {
        const records = await getTellingRecords(token);
        const currentRecord = records.find(
          (r: TellingRecord) => r.id === Number(params.id)
        );
        if (currentRecord) {
          setRecord(currentRecord);
          const [childData, booksData] = await Promise.all([
            getChildId(String(currentRecord.child)),
            getUserBooks(token),
          ]);
          setChild(childData);
          setBooks(booksData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !record) return;

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      await updateTellingRecord(token, record.id, record);
      router.push("/telling-record");
    } catch (error) {
      console.error("Failed to update record:", error);
      alert("更新に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !user ||
      !record ||
      !confirm("本当に削除しますか？この操作は取り消せません。")
    )
      return;

    try {
      const token = await user.getIdToken();
      await deleteTellingRecord(token, record.id);
      router.push("/telling-record");
    } catch (error) {
      console.error("Failed to delete record:", error);
      alert("削除に失敗しました");
    }
  };

  if (isLoading || !child || !record) {
    return <Loading />;
  }

  const childAge = calculateAge(child.birthDate, record.telling_date);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          真実告知記録の詳細
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                お子さまのお名前
              </label>
              <input
                type="text"
                value={child.name}
                disabled
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm font-comic text-lg opacity-75"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                真実告知をした日*
              </label>
              <input
                type="date"
                value={record.telling_date}
                onChange={(e) =>
                  setRecord({ ...record, telling_date: e.target.value })
                }
                required
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                告知時の年齢
              </label>
              <input
                type="text"
                value={childAge}
                disabled
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm font-comic text-lg opacity-75"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                使用した絵本*
              </label>
              <select
                value={record.book}
                onChange={(e) =>
                  setRecord({ ...record, book: Number(e.target.value) })
                }
                required
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg"
              >
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                お子さまの反応
              </label>
              <textarea
                value={record.child_reaction}
                onChange={(e) =>
                  setRecord({ ...record, child_reaction: e.target.value })
                }
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg h-32"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                メモ
              </label>
              <textarea
                value={record.notes}
                onChange={(e) =>
                  setRecord({ ...record, notes: e.target.value })
                }
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg h-32"
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 font-comic hover:scale-105"
              >
                <Trash size={20} />
                削除
              </button>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/telling-record")}
                  className="bg-white text-orange-600 px-6 py-3 rounded-full hover:bg-orange-100 transition-colors duration-300 flex items-center gap-2 font-comic hover:scale-105"
                >
                  <Home size={20} />
                  戻る
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2 font-comic hover:scale-105 ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? (
                    <>
                      <span className="animate-spin mr-2">&#9696;</span>
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      保存
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
