"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function CheckoutSuccess() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        console.error("ユーザーがログインしていません");
        return;
      }

      currentUser
        .getIdToken(true)
        .then(function (idToken) {
          fetch(`http://localhost:8000/api/payments/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // POSTリクエストが成功した後に/homeにリダイレクト
              router.push("/home");
            })
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => {
          console.error("IDトークンの取得に失敗しました:", error);
        });
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">支払いが完了しました！</h1>
        <p className="text-lg">
          お支払いありがとうございます。画面が自動的に遷移するまでお待ちください。
        </p>
      </div>
    </div>
  );
}
