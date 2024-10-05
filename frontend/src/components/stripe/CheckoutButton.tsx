"use client";
import React from "react";
import { auth } from "@/lib/firebase";
import { apiUrl } from "@/lib/config";

const CheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("ユーザーがログインしていません");
        return;
      }

      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${apiUrl}/stripe/create-checkout-session/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("エラー:", data.error);
      }
    } catch (error) {
      console.error("リクエストが失敗しました:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded"
    >
      有料プランへ
    </button>
  );
};

export default CheckoutButton;
