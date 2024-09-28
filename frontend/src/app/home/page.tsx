import React from "react";
import Head from "next/head"; // Next.jsでのSEO対策用
import Image from "next/image"; // Next.jsのImageコンポーネントでパフォーマンス向上
import Link from "next/link";

const HomePage = () => {
  const features = [
    { title: "パーソナライズ絵本", desc: "お子様の名前や趣味を反映した物語を作成。", img: "/path/to/icon1.png" },
    { title: "PDF出力可能", desc: "作成した絵本を簡単にPDFで保存・印刷。", img: "/path/to/icon2.png" },
    { title: "成長に応じたストーリー", desc: "お子様の成長に合わせた物語を提供。", img: "/path/to/icon3.png" },
    { title: "簡単操作", desc: "初心者でも簡単に操作できるインターフェース。" , img: "/path/to/icon4.png" },
  ];

  return (
    <>
      <Head>
        <title>家族向けストーリーアプリ - YourCompany</title>
        <meta name="description" content="家族と共に作る物語。パーソナライズされた絵本で素敵な時間を共有しましょう。" />
      </Head>

      <div>
        {/* ヘッダー */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="text-lg font-bold text-pink-600">YourCompany</div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="#home" legacyBehavior><a className="hover:text-pink-600">ホーム</a></Link></li>
                <li><Link href="#features" legacyBehavior><a className="hover:text-pink-600">機能紹介</a></Link></li>
                <li><Link href="#pricing" legacyBehavior><a className="hover:text-pink-600">料金プラン</a></Link></li>
                <li><Link href="#support" legacyBehavior><a className="hover:text-pink-600">サポート</a></Link></li>
                <li><Link href="#contact" legacyBehavior><a className="hover:text-pink-600">お問い合わせ</a></Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section id="home" className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-pink-500 mb-6">家族に寄り添った物語を、あなたの手で作ろう</h1>
            <p className="text-xl mb-8">物語をカスタマイズして、家族と素晴らしい時間を共有しましょう。</p>
            <Link href="/register" legacyBehavior>
              <a className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg hover:bg-pink-700 transition-all duration-200">今すぐはじめる</a>
            </Link>
            <div className="mt-4">
              <Link href="/login" legacyBehavior>
                <a className="text-pink-600 text-sm hover:underline">すでに登録済の方はこちらからLogin</a>
              </Link>
            </div>
          </div>
        </section>

        {/* サービス紹介セクション */}
        <section id="features" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-500 mb-10">サービスの特徴</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="p-4 bg-pink-50 rounded-lg shadow-md transition transform hover:scale-105">
                  <Image
                    src={feature.img} // 画像パスを適宜修正
                    alt={feature.title}
                    width={100}
                    height={100}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-pink-600">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* プランと料金セクション */}
        <section id="pricing" className="py-16 bg-pink-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-500 mb-10">料金プラン</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
              {/* 無料プラン */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
                <h3 className="text-xl font-semibold mb-4 text-center text-pink-600">無料プラン</h3>
                <p className="text-gray-600 mb-6 text-left">無料プランでは、以下の機能を利用できます：</p>
                <ul className="list-disc list-inside mb-4 text-left">
                  <li>お子さんの年齢や背景に応じたパターン選択による絵本生成が簡単にできます！</li>
                  <li>生成した絵本の内容をPDF出力・保存が可能です！</li>
                  <li>お父さん・お母さんからの冒頭のメッセージをオリジナルで入れることができます！</li>
                </ul>
              </div>

              {/* 有料プラン */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
                <h3 className="text-xl font-semibold mb-4 text-center text-pink-600">有料プラン</h3>
                <p className="text-gray-600 mb-6 text-left">有料プランでは、以下の機能を利用できます：</p>
                <ul className="list-disc list-inside mb-4 text-left">
                  <li>パーソナライズされたストーリーと画像を使った世界に一つだけのオリジナル絵本生成が可能です！</li>
                  <li>生成した絵本の内容をPDF出力・保存が可能です。</li>
                  <li>お父さん・お母さんからの冒頭のメッセージをオリジナルで入れることができます！</li>
                  <li>お子さんやお父さん・お母さんの写真を読み込んで、登場人物の顔が似ているように加工できます！</li>
                  <li>過去に生成したPDFの保存・呼び出しも可能です！</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 YourCompany. All rights reserved.</p>
            <div className="mt-4">
              <a href="#" className="mx-2 hover:text-yellow-400">Facebook</a>
              <a href="#" className="mx-2 hover:text-yellow-400">Instagram</a>
              <a href="#" className="mx-2 hover:text-yellow-400">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
