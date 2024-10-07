import React, { useState, useEffect } from "react";
import { getUserBooks, downloadBookPDF } from "@/lib/api";
import Button from "@/components/Button";
import { Book as BookType } from "@/types";

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
          <Button onClick={() => handleDownload(book.id)}>ダウンロード</Button>
        </div>
      ))}
    </div>
  );
};

export default DownloadPdf;
