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
        <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Indie+Flower&family=Sawarabi+Gothic&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-peach-100 font-playful" style={{ fontFamily: "'Sawarabi Gothic', sans-serif" }}>
        {/* ヘッダー */}
        <header className="bg-peach-300 shadow-md">
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
        <section id="home" className="bg-peach-200 py-16 text-center">
          <h1 className="text-4xl font-bold text-orange-700 mb-6" style={{ fontFamily: "'Indie Flower', cursive" }}>
            家族と一緒に成長するストーリーを作ろう！
          </h1>
          <p className="text-xl mb-8" style={{ fontFamily: "'Caveat', cursive" }}>
            お子様だけのパーソナライズされた絵本を作ってみましょう！
          </p>
          {/* ヒーローセクションの画像 */}
          <Image
            src="https://files.oaiusercontent.com/file-7aow1rff3Jlcv4m5vI2PxBQf?se=2024-09-30T12%3A05%3A37Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D60eee5b0-afdb-4597-a9d4-8eafecf05203.webp&sig=2AyujhM7lZVTsisXqgc10RzbFWzICFJZQ6bEsvKXdZ0%3D"
            alt="ヒーローセクションのイメージ"
            width={1200} // 幅を設定
            height={600} // 高さを設定
            className="object-cover mx-auto mb-4 rounded-lg shadow-lg"
          />
          <Link href="/register">
            <button className="bg-orange-400 text-white px-8 py-4 rounded-full text-lg hover:bg-orange-300 transition-all duration-200 transform hover:scale-105 shadow-lg mt-8">
              今すぐ始めよう！
            </button>
          </Link>
          <div className="mt-4">
            <Link href="/login" className="text-orange-600 text-sm hover:underline">もう登録済みですか？ここからログイン</Link>
          </div>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-16 bg-peach-300">
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
