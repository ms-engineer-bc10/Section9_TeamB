"use client";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function CheckoutSuccess() {
  useEffect(() => {
    // Firebase認証状態が変わるたびにコールバックを実行
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        console.error("ユーザーがログインしていません");
        return;
      }

      currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          fetch(`http://localhost:8000/api/payments/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
        })
        .catch((error) => {
          console.error("IDトークンの取得に失敗しました:", error);
        });
    });

    // クリーンアップ関数を返してイベントリスナーを解除
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Payment Success!</h1>
      <p>Thank you for your payment.</p>
    </div>
  );
}
