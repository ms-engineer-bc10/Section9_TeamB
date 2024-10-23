"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getChild, getUserBooks, createTellingRecord } from "@/lib/api";
import { Book, ChildFormData, TellingRecord } from "@/types";
import { calculateAge } from "@/utils/dateFormat";
import { Home, Save } from "lucide-react";
import Loading from "@/components/Loading";

export default function NewTellingRecord() {
  const [children, setChildren] = useState<ChildFormData[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [childAge, setChildAge] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<TellingRecord, "id" | "user">>({
    child: 0,
    book: 0,
    telling_date: new Date().toISOString().split("T")[0],
    child_reaction: "",
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const token = await user.getIdToken();
      try {
        const [childrenData, booksData] = await Promise.all([
          getChild(token),
          getUserBooks(token),
        ]);
        setChildren(childrenData);
        setBooks(booksData);

        // 最初の子どもを選択
        if (childrenData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            child: childrenData[0].id,
            book: booksData.length > 0 ? booksData[0].id : 0,
          }));
          updateChildAge(childrenData[0].birthDate, formData.telling_date);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const updateChildAge = (birthDate: string, tellingDate: string) => {
    const age = calculateAge(birthDate, tellingDate);
    setChildAge(age);
  };

  const handleChildChange = (childId: number) => {
    const selectedChild = children.find((child) => child.id === childId);
    setFormData((prev) => ({ ...prev, child: childId }));
    if (selectedChild) {
      updateChildAge(selectedChild.birthDate, formData.telling_date);
    }
  };

  const handleDateChange = (date: string) => {
    const selectedChild = children.find((child) => child.id === formData.child);
    setFormData((prev) => ({ ...prev, telling_date: date }));
    if (selectedChild) {
      updateChildAge(selectedChild.birthDate, date);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      await createTellingRecord(token, formData);
      router.push("/telling-record");
    } catch (error) {
      console.error("Failed to create record:", error);
      alert("登録に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          真実告知記録の新規登録
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                お子さまのお名前*
              </label>
              <select
                value={formData.child}
                onChange={(e) => handleChildChange(Number(e.target.value))}
                required
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg"
              >
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                真実告知をした日*
              </label>
              <input
                type="date"
                value={formData.telling_date}
                onChange={(e) => handleDateChange(e.target.value)}
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
                value={formData.book}
                onChange={(e) =>
                  setFormData({ ...formData, book: Number(e.target.value) })
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
                value={formData.child_reaction}
                onChange={(e) =>
                  setFormData({ ...formData, child_reaction: e.target.value })
                }
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg h-32"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-orange-600 mb-2 font-comic">
                メモ
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full py-3 px-4 border-2 border-orange-300 bg-orange-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-comic text-lg h-32"
              />
            </div>

            <div className="flex justify-end items-center pt-4 gap-4">
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
                    登録中...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    登録
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}