"use client";
import Link from "next/link";
import { useState } from "react";

const message = () => {
  // デフォルトのメッセージを設定
  const defaultMessage = `ゆうたへ\n\nゆうたが パパとママのところに きてくれて\nパパとママは まいにちが たのしくてあかるいよ。\nこれは たいせつなゆうたに きてほしいおはなしです。\nゆうたが かんじてほしいとき いつでも いっしょにおもう。\nそして ゆうたのきもちも きかせてね。`;

  // メッセージのステート管理
  const [message, setMessage] = useState(defaultMessage);

  // テキストエリアの変更を処理する関数
  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">メッセージを編集する</h1>
        <p className="text-gray-600 mb-4">
          お子さまに宛てたメッセージを編集できます。入力された通りに印刷されますので、誤字等がないかご確認ください。
        </p>

        <textarea
          className="w-full h-48 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={message}
          onChange={handleMessageChange}
        />

        <Link href="/background">
          <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition">
            OK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default message;
