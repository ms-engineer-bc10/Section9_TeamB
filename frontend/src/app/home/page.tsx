import React from "react";
import Head from "next/head";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>楽しい絵本アプリ - YourCompany</title>
        <meta
          name="description"
          content="家族と一緒に成長するパーソナライズされた絵本を作りましょう！"
        />
      </Head>

      <div className="bg-white font-sans">
        {/* ヘッダー */}
        <header className="shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <div className="text-lg font-bold text-orange-700">YourCompany</div>
            <nav>
              <ul className="flex space-x-6 items-center">
                <li>
                  <Link
                    href="/how-to-use"
                    className="hover:text-orange-500 transition-colors duration-200"
                  >
                    使い方
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-300 transition-colors duration-200"
                  >
                    サインアウト
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section id="home" className="py-16 text-center">
          <h1 className="text-4xl font-bold text-orange-700 mb-6">
            [ユーザー名]さん、ログインありがとうございます！
          </h1>
          <p className="text-xl mb-6">一緒にストーリーを作りましょう！(仮)</p>
        </section>

        {/* 登録確認セクション */}
        <section id="registration" className="py-16 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">
              子どもの登録情報を確認
            </h2>
            <Link href="/register">
              <button className="bg-orange-400 text-white px-8 py-4 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                子どもの登録情報を確認
              </button>
            </Link>
          </div>
        </section>

        {/* 自分の登録情報セクション */}
        <section id="user-registration" className="py-16 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-10">
              自分の登録情報
            </h2>
            <Link href="/register">
              <button className="bg-orange-400 text-white px-8 py-4 rounded-lg shadow-md hover:bg-orange-300 transition-all duration-200">
                自分の登録情報を確認
              </button>
            </Link>
          </div>
        </section>

        {/* 絵本生成セクション */}
        <section id="storybook-generation" className="py-16 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">
              絵本生成
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <Link href="/children">
                <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                  <h3 className="text-xl font-semibold">
                    オリジナル絵本を生成
                  </h3>
                </div>
              </Link>
              <Link href="/PDF">
                <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                  <h3 className="text-xl font-semibold">
                    生成した絵本をPDFで見る
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Tellingの記録セクション */}
        <section id="past-stories" className="py-16 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">
              Tellingの記録
            </h2>
            <Link href="/past-stories">
              <button className="bg-orange-400 text-white px-8 py-4 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                記録を確認
              </button>
            </Link>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="py-16 bg-peach-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">
              お問い合わせ
            </h2>
            <p className="mb-6">
              ご質問やご要望がありましたら、こちらからお問い合わせください。
            </p>
            <Link href="/contact">
              <button className="bg-orange-400 text-white px-8 py-4 rounded-full text-lg hover:bg-orange-300 transition-all duration-200">
                お問い合わせ
              </button>
            </Link>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-orange-700 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 YourCompany. All rights reserved.</p>
            <div className="mt-4">
              <Link
                href="#"
                className="mx-2 hover:text-yellow-200 transition-colors duration-200"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="mx-2 hover:text-yellow-200 transition-colors duration-200"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="mx-2 hover:text-yellow-200 transition-colors duration-200"
              >
                Twitter
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
