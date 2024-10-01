import React from "react";
import Head from "next/head";
import Link from "next/link";

const HomePage: React.FC = () => {
  const pastStories = [
    { age: "3歳", description: "冒険の物語" },
    { age: "5歳", description: "友達との友情" },
    { age: "7歳", description: "夢を追いかける" },
  ];

  const features = [
    { title: "無料会員の方はこちら", steps: ["まずはストーリーの型を選んでね", "次にオリジナルメッセージを入力しよう"] },
    { title: "有料会員の方はこちら", steps: ["作りたいストーリーを入力しよう", "登場人物のキャラクターをオリジナルにカスタマイズしよう！"] },
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
                <li><Link href="#features" className="hover:text-orange-500 transition-colors duration-200">絵本生成の手引き</Link></li>
                <li><Link href="#registration" className="hover:text-orange-500 transition-colors duration-200">登録情報</Link></li>
                <li><Link href="#storybook-generation" className="hover:text-orange-500 transition-colors duration-200">絵本生成</Link></li>
                <li><Link href="#past-stories" className="hover:text-orange-500 transition-colors duration-200">Tellingの記録</Link></li>
                <li><Link href="#contact" className="hover:text-orange-500 transition-colors duration-200">お問い合わせ</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section id="home" className="bg-peach-200 py-16 text-center">
          <h1 className="text-4xl font-bold text-orange-700 mb-6" style={{ fontFamily: "'Indie Flower', cursive" }}>
            [ユーザー名]さん、ログインありがとうございます！<br />
            一緒にストーリーを作りましょう！
          </h1>
          {/* ユーザー名表示 */}
          <Link href="/logout">
            <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-300 transition-colors duration-200">
              サインアウト
            </button>
          </Link>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-16 bg-peach-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">絵本生成の手引き</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <div key={index} className="p-4 bg-yellow-200 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-orange-700 mb-4">{feature.title}</h3>
                  <ul className="list-disc list-inside">
                    {feature.steps.map((step, i) => (
                      <li key={i} className="text-gray-600">{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 登録情報セクション */}
        <section id="registration" className="py-16 bg-peach-200">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">登録情報</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* 自分の登録情報ボタン */}
              <Link href="/register">
                <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                  <h3 className="text-xl font-semibold">自分の登録情報を確認</h3>
                </div>
              </Link>
              {/* 子どもの登録情報ボタン */}
              <Link href="/register">
                <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                  <h3 className="text-xl font-semibold">子どもの登録情報を確認</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 絵本生成セクション */}
        <section id="storybook-generation" className="py-16 bg-peach-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">絵本生成</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* オリジナル絵本生成ボタン */}
              <Link href="/preview">
                <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                  <h3 className="text-xl font-semibold">オリジナル絵本を生成</h3>
                </div>
              </Link>
              {/* PDFで見るボタン */}
              <Link href="/PDF">
                <div className="bg-orange-400 text-white p-6 rounded-lg shadow-md hover:bg-orange-300 transition-colors duration-200">
                  <h3 className="text-xl font-semibold">生成した絵本をPDFで見る</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Tellingの記録を確認セクション */}
        <section id="past-stories" className="py-16 bg-peach-200">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">Tellingの記録を確認</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {pastStories.map((story, index) => (
                <div key={index} className="p-4 bg-yellow-200 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{story.age}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="py-16 bg-peach-300">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-10">お問い合わせ</h2>
            <p className="mb-6">ご質問やご要望がありましたら、こちらからお問い合わせください。</p>
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

