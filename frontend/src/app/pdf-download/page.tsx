"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChild, getUserBooks, downloadBookPDF } from "@/lib/api";
import { useRedirectIfNotAuthenticated } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import Button from "@/components/Button";
import { Book } from "@/types";

interface Child {
  id: number;
  name: string;
}

export default function BookDownloadPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
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
              fetchedBooks.filter((book) => book.child === selectedChildId)
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">絵本のダウンロード</h1>
      <div className="mb-6">
        <label
          htmlFor="childSelect"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          お子さんを選択:
        </label>
        <select
          id="childSelect"
          value={selectedChildId || ""}
          onChange={(e) => setSelectedChildId(Number(e.target.value))}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">選択してください</option>
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name}
            </option>
          ))}
        </select>
      </div>
      {selectedChildId && (
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(book.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button onClick={() => handleDownload(book.id)}>
                ダウンロード
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Button onClick={() => router.push("/home")}>ホームに戻る</Button>
      </div>
    </div>
  );
}
