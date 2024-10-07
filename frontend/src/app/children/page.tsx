"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getChild } from "@/lib/api";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";

const Page = () => {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (token: string) => {
      try {
        const data = await getChild(token); // 子ども情報をGET
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Firebase認証状態の変化を監視
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(); // Firebaseユーザートークンを取得
          fetchData(token); // 子ども情報を取得
        } catch (error) {
          console.error("Error fetching token:", error);
          setLoading(false);
        }
      } else {
        console.error("User is not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-orange-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        だれの本を作成する？
      </h1>
      <div className="flex flex-col space-y-4">
        <Link href="/children/input">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 focus:outline-none shadow-md transition-all w-60">
            新規入力
          </button>
        </Link>
        {children.length > 0 &&
          children.map((child) => (
            <Link key={child.id} href={`/children/${child.id}`}>
              <button className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 focus:outline-none shadow-md transition-all w-60">
                {child.name}の本を作成する
              </button>
            </Link>
          ))}
      </div>
      <div className="mt-10"></div>
    </div>
  );
};

export default Page;
