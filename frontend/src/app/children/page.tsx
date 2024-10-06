"use client";
import React, { useEffect, useState } from "react";
import { getChild } from "@/lib/api";
import Link from "next/link";

const Page = () => {
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChild();
        setChildren(data);
      } catch (error) {
        console.error("Error fetching children data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
