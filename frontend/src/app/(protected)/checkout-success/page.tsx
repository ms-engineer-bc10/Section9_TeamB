"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { postPayment } from "@/lib/api"; // api.tsから関数をインポート

export default function CheckoutSuccess() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      console.error("ユーザーがログインしていません");
      return;
    }

    user
      .getIdToken(true)
      .then((idToken: string) => {
        postPayment(idToken)
          .then((data) => {
            console.log(data);
            router.push("/plan");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error: any) => {
        console.error("IDトークンの取得に失敗しました:", error);
      });
  }, [user, router]);

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
