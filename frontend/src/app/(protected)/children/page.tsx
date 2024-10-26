"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getChild } from "@/lib/api";
import Link from "next/link";
import { Book, Home, Star } from "lucide-react";
import Loading from "@/components/Loading";
import Button from "@/components/Button";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
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

    if (user) {
      user
        .getIdToken()
        .then(fetchData)
        .catch((error: any) => {
          console.error("Error fetching token:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
            だれの絵本を作成する？
          </h1>

          <div className="space-y-4">
            <Link href="/children/input" className="block">
              <button className="w-full bg-orange-500 text-white px-6 py-4 rounded-2xl hover:bg-orange-600 focus:outline-none shadow-lg transition-all transform hover:scale-105 font-comic text-lg flex items-center justify-center">
                <Star className="mr-2 animate-wiggle" size={24} />
                新規作成する
              </button>
            </Link>

            {children.length > 0 &&
              children.map((child) => (
                <Link
                  key={child.id}
                  href={`/children/${child.id}`}
                  className="block"
                >
                  <button className="w-full bg-orange-400 text-white px-6 py-4 rounded-2xl hover:bg-orange-500 focus:outline-none shadow-lg transition-all transform hover:scale-105 font-comic text-lg flex items-center justify-center">
                    <Book className="mr-2 animate-wiggle" />
                    {child.name}の絵本を作成する
                  </button>
                </Link>
              ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => router.push("/home")}>
              <Home className="mr-2" size={20} />
              ホームに戻る
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
