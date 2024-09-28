import React from "react";
import Head from "next/head"; // Next.jsでのSEO対策用
import Image from "next/image"; // Next.jsのImageコンポーネントでパフォーマンス向上
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      {/* HeadセクションでSEO対策 */}
      <Head>
        <title>家族向けストーリーアプリ - YourCompany</title>
        <meta
          name="description"
          content="家族と共に作る物語。パーソナライズされた絵本で素敵な時間を共有しましょう。"
        />
      </Head>

      <div>
        {/* ヘッダー */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="text-lg font-bold">YourCompany</div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="#home">
                    <a className="hover:text-blue-600">ホーム</a>
                  </Link>
                </li>
                <li>
                  <Link href="#features">
                    <a className="hover:text-blue-600">機能紹介</a>
                  </Link>
                </li>
                <li>
                  <Link href="#pricing">
                    <a className="hover:text-blue-600">料金プラン</a>
                  </Link>
                </li>
                <li>
                  <Link href="#support">
                    <a className="hover:text-blue-600">サポート</a>
                  </Link>
                </li>
                <li>
                  <Link href="#contact">
                    <a className="hover:text-blue-600">お問い合わせ</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section id="home" className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              家族に寄り添った物語を、あなたの手で作ろう
            </h1>
            <p className="text-xl mb-8">
              物語をカスタマイズして、家族と素晴らしい時間を共有しましょう。
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700">
              今すぐはじめる
            </button>
          </div>
        </section>

        {/* サービス紹介セクション */}
        <section id="features" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">サービスの特徴</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <div>
                {/* Imageコンポーネントでパフォーマンス向上 */}
                <Image
                  src="/path/to/icon1.png"
                  alt="アイコン1"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">パーソナライズ絵本</h3>
                <p className="text-gray-600">
                  お子様の名前や趣味を反映した物語を作成。
                </p>
              </div>
              <div>
                <Image
                  src="/path/to/icon2.png"
                  alt="アイコン2"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">PDF出力可能</h3>
                <p className="text-gray-600">
                  作成した絵本を簡単にPDFで保存・印刷。
                </p>
              </div>
              <div>
                <Image
                  src="/path/to/icon3.png"
                  alt="アイコン3"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">成長に応じたストーリー</h3>
                <p className="text-gray-600">
                  お子様の成長に合わせた物語を提供。
                </p>
              </div>
              <div>
                <Image
                  src="/path/to/icon4.png"
                  alt="アイコン4"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">簡単操作</h3>
                <p className="text-gray-600">
                  初心者でも簡単に操作できるインターフェース。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* プランと料金セクション */}
        <section id="pricing" className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">料金プラン</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">無料プラン</h3>
                <p className="text-gray-600 mb-6">
                  基本機能がすべて無料で使えます。
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                  登録する
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">有料プラン</h3>
                <p className="text-gray-600 mb-6">
                  追加機能や特別なオプションが利用可能です。
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                  有料プランに申し込む
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 YourCompany. All rights reserved.</p>
            <div className="mt-4">
              <a href="#" className="mx-2">
                Facebook
              </a>
              <a href="#" className="mx-2">
                Instagram
              </a>
              <a href="#" className="mx-2">
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
