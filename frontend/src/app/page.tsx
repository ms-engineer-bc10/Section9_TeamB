import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const features = [
    { title: "パーソナライズされた絵本", desc: "あなたのお子様にピッタリのストーリーを作ろう！", img: "/path/to/new_icon1.png" },
    { title: "PDFで簡単保存", desc: "作った絵本をPDFで印刷しよう。", img: "/path/to/new_icon2.png" },
    { title: "成長に合わせたお話", desc: "お子様の年齢に合わせたお話を選べます。", img: "/path/to/new_icon3.png" },
    { title: "シンプルで楽しい操作", desc: "簡単操作で誰でも楽しめます。", img: "/path/to/new_icon4.png" },
  ];

  return (
    <>
      <Head>
        <title>楽しい絵本アプリ - YourCompany</title>
        <meta name="description" content="家族と一緒に成長するパーソナライズされた絵本を作りましょう！" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Indie+Flower&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-beige-100 font-playful">
        {/* ヘッダー */}
        <header className="bg-beige-300 shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="text-lg font-bold text-orange-700">YourCompany</div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="#home" className="hover:text-orange-500 transition-colors duration-200">ホーム</Link></li>
                <li><Link href="#features" className="hover:text-orange-500 transition-colors duration-200">特徴</Link></li>
                <li><Link href="#pricing" className="hover:text-orange-500 transition-colors duration-200">料金</Link></li>
                <li><Link href="#contact" className="hover:text-orange-500 transition-colors duration-200">お問い合わせ</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section id="home" className="bg-beige-200 py-16 text-center">
          <h1 className="text-4xl font-bold text-orange-700 mb-6">家族と一緒に成長するストーリーを作ろう！</h1>
          <p className="text-xl mb-8">お子様だけのパーソナライズされた絵本を作ってみましょう！</p>
          <Link href="/register">
            <button className="bg-orange-400 text-white px-8 py-4 rounded-full text-lg hover:bg-orange-300 transition-all duration-200 transform hover:scale-105 shadow-lg">
              今すぐ始めよう！
            </button>
          </Link>
          <div className="mt-4">
            <Link href="/login" className="text-orange-600 text-sm hover:underline">もう登録済みですか？ここからログイン</Link>
          </div>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-16 bg-beige-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">特徴</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="p-4 bg-yellow-200 rounded-lg shadow-md hover:scale-105 transition-transform">
                  <Image src={feature.img} alt={feature.title} width={100} height={100} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-orange-700">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 価格セクション */}
        <section id="pricing" className="py-16 bg-beige-400">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">料金プラン</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
              {/* 無料プラン */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-orange-600">
                <h3 className="text-xl font-semibold mb-4 text-center text-orange-700">無料プラン</h3>
                <p className="text-gray-600 mb-6 text-left">以下の機能が利用できます：</p>
                <ul className="list-disc list-inside mb-4 text-left">
                  <li>簡単なストーリー作成</li>
                  <li>PDF出力</li>
                  <li>カスタムメッセージの追加</li>
                </ul>
              </div>

              {/* 有料プラン */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-orange-600">
                <h3 className="text-xl font-semibold mb-4 text-center text-orange-700">有料プラン</h3>
                <p className="text-gray-600 mb-6 text-left">追加機能：</p>
                <ul className="list-disc list-inside mb-4 text-left">
                  <li>完全パーソナライズストーリー</li>
                  <li>キャラクターカスタマイズ</li>
                  <li>過去ストーリーブックの保存</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-orange-700 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 YourCompany. All rights reserved.</p>
            <div className="mt-4">
              <Link href="#" className="mx-2 hover:text-yellow-200 transition-colors duration-200">Facebook</Link>
              <Link href="#" className="mx-2 hover:text-yellow-200 transition-colors duration-200">Instagram</Link>
              <Link href="#" className="mx-2 hover:text-yellow-200 transition-colors duration-200">Twitter</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
