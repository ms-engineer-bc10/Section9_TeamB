"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getChild } from "@/lib/api";
import DownloadPdf from "@/components/DownloadPdf";
import Button from "@/components/Button";

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
        // 実際の認証トークン取得ロジックに置き換える必要があります
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">絵本ダウンロード</h1>
      <div className="mb-6">
        <label
          htmlFor="childSelect"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          子どもを選択:
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
      {selectedChildId && token && (
        <DownloadPdf token={token} childId={selectedChildId} />
      )}
      <div className="mt-8">
        <Button onClick={() => router.push("/home")}>ホームに戻る</Button>
      </div>
    </div>
  );
}
