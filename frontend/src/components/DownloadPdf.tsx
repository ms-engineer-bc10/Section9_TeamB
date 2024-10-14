import React, { useState, useEffect } from "react";
import { getUserBooks, downloadBookPDF } from "@/lib/api";
import { Book as BookType } from "@/types";
import { Book, Download } from "lucide-react";

interface DownloadPdfProps {
  token: string;
  childId: number;
}

const DownloadPdf: React.FC<DownloadPdfProps> = ({ token, childId }) => {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getUserBooks(token);
        setBooks(
          fetchedBooks.filter((book: BookType) => book.child === childId)
        );
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [token, childId]);

  const handleDownload = async (bookId: number) => {
    try {
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
  };

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Book className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-comic text-xl text-orange-600">
                  {book.title}
                </h3>
                <p className="text-sm text-orange-400 font-comic">
                  {new Date(book.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(book.id)}
              className="bg-orange-500 text-white px-4 py-2 rounded-full font-comic text-sm hover:bg-orange-600 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Download size={16} />
              <span>ダウンロード</span>
            </button>
          </div>
        </div>
      ))}
      {books.length === 0 && (
        <div className="text-center py-8">
          <p className="font-comic text-orange-600 text-xl">
            まだ絵本がありません。
          </p>
          <p className="font-comic text-orange-400 mt-2">
            新しい絵本を作成してみましょう！
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadPdf;
