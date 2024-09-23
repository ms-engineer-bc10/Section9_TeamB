"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Plan = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">プラン選択</h1>

      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 border border-black rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold">有料プラン</h2>
          <p>有料プランの詳細説明がここに入ります。</p>
          <form action="/create-checkout-session" method="POST">
            <button
              type="submit"
              className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded"
            >
              有料プランへ
            </button>
          </form>
        </div>

        <div className="p-4 border border-black rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold">無料プラン</h2>
          <p>無料プランの詳細説明がここに入ります。</p>
          <Link href="/message">
            <p className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded">
              無料プランへ
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Message = ({ message }: { message: string }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <Plan />;
}
