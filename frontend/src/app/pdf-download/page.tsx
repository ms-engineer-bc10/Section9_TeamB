"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChild, getUserBooks, downloadBookPDF } from "@/lib/api";
import { useRedirectIfNotAuthenticated } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { Book, Download, Home } from "lucide-react";
import { Book as BookType } from "@/types";
import Loading from "@/components/Loading";

interface Child {
  id: number;
  name: string;
}

export default function BookDownloadPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useRedirectIfNotAuthenticated();

  useEffect(() => {
    const fetchChildren = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await user.getIdToken();
          const fetchedChildren = await getChild(token);
          setChildren(fetchedChildren);
        } catch (error) {
          console.error("Error fetching children:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChildren();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (selectedChildId) {
        const user = auth.currentUser;
        if (user) {
          try {
            const token = await user.getIdToken();
            const fetchedBooks = await getUserBooks(token);
            setBooks(
              fetchedBooks.filter((book: any) => book.child === selectedChildId)
            );
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        }
      }
    };

    fetchBooks();
  }, [selectedChildId]);

  const handleDownload = async (bookId: number) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        const pdfBlob = await downloadBookPDF(token, bookId);
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `book_${bookId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
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

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          絵本のダウンロード
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
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
          {selectedChildId && (
            <div className="space-y-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-6 bg-white shadow-lg rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center">
                    <Book className="text-orange-500 mr-4" size={32} />
                    <div>
                      <h3 className="font-semibold text-xl text-gray-600 font-comic">
                        {book.title}
                      </h3>
                      <p className="text-sm text-orange-400 font-comic">
                        {new Date(book.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(book.id)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 flex items-center font-comic hover:scale-105"
                  >
                    <Download className="mr-2" size={20} />
                    ダウンロード
                  </button>
                </div>
              ))}
            </div>
          )}
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
  );
}
