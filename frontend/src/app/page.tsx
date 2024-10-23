"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Book,
  FileText,
  Baby,
  Lightbulb,
  Heart,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const features = [
    {
      title: "パーソナライズされた絵本",
      desc: "出自背景に応じた特別なストーリーが作れます！",
      icon: <Book className="w-12 h-12 text-[#4CAF50]" />,
    },
    {
      title: "PDFで簡単保存",
      desc: "作った絵本はPDFで簡単に保存、印刷も可能です",
      icon: <FileText className="w-12 h-12 text-[#4CAF50]" />,
    },
    {
      title: "真実告知の記録機能",
      desc: "話した内容などを記録して次に活かせます",
      icon: <Lightbulb className="w-12 h-12 text-[#4CAF50]" />,
    },
    {
      title: "成長に合わせたストーリー",
      desc: "お子さまの年齢や興味に合わせて複数回作成できます",
      icon: <Baby className="w-12 h-12 text-[#4CAF50]" />,
    },
  ];

  const faqs = [
    {
      question: "Q. どんな年齢の子供向けですか？",
      answer:
        "A. 主に1〜6歳のお子様向けですが、年齢に合わせたストーリーを提供しています。",
    },
    {
      question: "Q. 絵本の作成にどのくらい時間がかかりますか？",
      answer:
        "A. 入力時間を含めて10〜20分程度で作成できます。より詳細なカスタマイズを行う場合は、さらに時間がかかる場合があります。",
    },
    {
      question: "Q. 作成した絵本を実際に印刷することはできますか？",
      answer:
        "A. はい、PDFでダウンロードしてご自宅で印刷できます。また、高品質印刷サービスも準備中です。",
    },
  ];

  const userVoices = [
    {
      name: "田中さん家族",
      comment:
        "子供の誕生日プレゼントに作りました。名前入りの絵本に子供が大喜び！",
      bookImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PrEvse0atDddUARolhyFJNkSUXGNiZ.png",
      bookTitle: "あしたはだれのたんじょうび？",
    },
    {
      name: "佐藤さん家族",
      comment: "家族の思い出をストーリーにできて、素敵な記念になりました。",
      bookImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Al78gCdXbEH9yF0gCimL93mmVwgP5K.png",
      bookTitle: "みんなのドタバタクリスマス！",
    },
    {
      name: "鈴木さん家族",
      comment: "兄弟仲良く一緒に読んでいます。想像力が豊かになった気がします。",
      bookImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c9pN0Rucfp043yNMhNuoM5TnEggxqv.png",
      bookTitle: "ふしぎな森のぼうけん",
    },
  ];

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>真実告知をサポートする絵本アプリ - Tellry</title>
        <meta
          name="description"
          content="お子さまだけの特別な絵本で、幼少期の真実告知をサポート！"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat&family=Indie+Flower&family=Sawarabi+Gothic&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className="bg-[#FFE4B5] font-playful min-h-screen"
        style={{ fontFamily: "'Sawarabi Gothic', sans-serif" }}
      >
        {/* ヘッダー */}
        <header className="bg-[#FF8C00] shadow-md p-4 rounded-b-3xl">
          <div className="container mx-auto flex justify-between items-center">
            <div
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Tellry
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="#top"
                    className="text-white hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
                  >
                    TOP
                  </Link>
                </li>
                <li>
                  <Link
                    href="#telling"
                    className="text-white hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
                  >
                    TELLING
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-white hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
                  >
                    FEATURES
                  </Link>
                </li>
                <li>
                  <Link
                    href="#plan"
                    className="text-white hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
                  >
                    PLAN
                  </Link>
                </li>
                <li>
                  <Link
                    href="#information"
                    className="text-white hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
                  >
                    INFORMATION
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-white hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section
          id="home"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg relative">
              <div className="relative z-10">
                <h1
                  className="text-4xl font-bold mb-6 text-[#FF8C00]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  お子さまだけの特別な絵本で、幼少期の真実告知をサポート！
                </h1>
                <p className="text-xl mb-8 text-[#444444] font-bold">
                  養子縁組や精子・卵子提供、ステップファミリーのお子さまに、幼少期からの真実告知ができるオリジナル絵本サービスです
                </p>
                <div className="flex justify-center items-center mb-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dNILutnqSdD3o6RhHsms0OofVg6uD4.png"
                    alt="家族で読書"
                    width={400}
                    height={300}
                    className="object-cover rounded-3xl shadow-lg"
                  />
                  <div className="ml-8">
                    <Link href="/register">
                      <button className="bg-[#FF8C00] text-white px-10 py-5 rounded-full text-xl hover:bg-[#FF7F00] transition-all duration-200 transform hover:scale-105 shadow-lg">
                        今すぐはじめよう！
                      </button>
                    </Link>
                    <div className="mt-4">
                      <Link
                        href="/login"
                        className="text-[#FF8C00] text-sm hover:underline"
                      >
                        登録済みの方はこちらからログイン
                      </Link>
                    </div>
                  </div>
                </div>

                {/* (Accordion menu) */}
                <button
                  className="w-full flex justify-center items-center text-2xl font-bold text-[#8D6E63] py-4 hover:bg-[#FFF3E0] focus:outline-none  rounded-t-lg transition-colors duration-300"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="mr-2">真実告知とは？</span>
                  <div className="flex items-center">
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-4 transition-all duration-300  p-6 rounded-b-lg">
                    <p className="text-[#444444] mb-6 text-center">
                      真実告知とは、親が子どもに対して、生まれた背景や家族のつながりについて真実を伝えると同時に
                      <br />
                      <span className="text-[#FF8C00] font-bold">
                        「あなたは私たちにとって大事な存在」
                      </span>
                      であることを伝え、
                      <br />
                      こどもの生い立ちを親子で一緒に受け止めていくための行いです。
                    </p>
                    <div className="bg-[#FFF3E0] p-4 rounded-lg   mb-4">
                      <p className="text-[#8D6E63] italic text-center">
                        子どもが出自（自分のルーツ）や生い立ちを知る権利を保障し、アイデンティティを確立するために欠かせない行為です。
                        <br />
                        お子さまがものごとを素直に受け入れることができる幼少期に行うことが重要です。
                      </p>
                    </div>
                    <div className="border-t-2 border-b-2 border-[#4CAF50] py-4">
                      <p className="text-[#4CAF50] font-semibold text-center">
                        養子縁組など様々なルーツを持つご家族に向けて真実告知のハードルを下げ、
                        <br />
                        日々の中で自然に伝えることができるよう絵本を通じてお手伝いできることが私たちのねがいです。
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section
          id="features"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2
                className="text-3xl font-bold text-center text-[#4CAF50] mb-10"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                アプリの特徴
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow border-4 border-dashed border-[#4CAF50]"
                    >
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-[#4CAF50] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#444444] font-bold">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 料金プラン */}
        <section
          id="plan"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8">
              {/* ライトプラン */}
              <div
                className="bg-white p-8 rounded-3xl shadow-lg max-w-xl w-full cursor-pointer transition-all duration-200"
                onClick={() => {
                  router.push("/regiter");
                }}
                style={{ border: "4px solid transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border = "4px solid #FF8C00")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border = "4px solid transparent")
                }
              >
                <h3 className="text-2xl font-bold mb-4 text-center text-[#FF8C00]">
                  ライトプラン
                </h3>
                <ul className="list-none p-0 mb-6">
                  <li className="mb-2 text-[#555555] text-lg font-bold">
                    ✨ お試しで1冊の絵本作成
                  </li>
                  <li className="mb-2 text-[#555555] text-lg font-bold">
                    🎨 真実告知の記録機能
                  </li>
                  <li className="mb-2 text-[#555555] text-lg font-bold">
                    📁 PDFで簡単保存
                  </li>
                </ul>
                <button className="w-full bg-[#FF8C00] text-white text-xl py-4 px-10 rounded-full hover:bg-[#FF7F00] hover:shadow-2xl transition-colors">
                  さっそく無料トライ！
                </button>
              </div>
              {/* スタンダードプラン */}
              <div
                className="bg-white p-8 rounded-3xl shadow-lg max-w-xl w-full cursor-pointer transition-all duration-200 relative"
                onClick={() => {
                  router.push("/register");
                }}
                style={{ border: "4px solid transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.border = "4px solid #FF8C00")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.border = "4px solid transparent")
                }
              >
                {/* おすすめラベル */}
                <div className="absolute -top-8 -right-8 bg-yellow-200 text-[#FF6F00] px-6 py-3 rounded-full shadow-lg transform rotate-12 transition-transform duration-300  animate-wiggle-lp">
                  <span className="font-bold text-lg">
                    ＼おすすめはこちら！／
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center text-[#FF8C00]">
                  スタンダードプラン
                </h3>
                <ul className="list-none p-0 mb-6">
                  <li className="mb-2 text-[#555555] text-lg font-bold">
                    🌟 10冊までの絵本作成（1か月間）
                  </li>
                  <li className="mb-2 text-[#555555] text-lg font-bold">
                    🎨 お子さま情報に基づくオリジナルストーリー
                  </li>
                  <li className="mb-2 text-[#999999] text-lg font-bold">
                    🖊 ストーリー編集機能(準備中)
                  </li>
                </ul>
                <Link href="http://localhost:3000/register">
                  <button className="w-full bg-[#FF8C00] text-white text-xl py-4 px-10 rounded-full hover:bg-[#FF7F00] hover:shadow-2xl transition-colors">
                    今すぐはじめる
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* インフォメーションセクション*/}
        <section
          id="information"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <Clock className="w-16 h-16 text-[#FF8C00] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-[#FF8C00]">
                コンテンツ開発中！
              </h3>
              <p className="text-[#444444] text-lg  mb-4">
                真実告知をサポートする保護者向けガイダンス機能は現在準備中です。
              </p>
              <p className="text-[#444444] text-lg  mb-4">
                専門家監修による、子どもの成長段階毎の心理状態や適切な声掛けなどのコンテンツをご提供予定です。
              </p>
              <ul className="list-none p-0 mt-6 space-y-2">
                <li className="text-[#444444] text-lg ">
                  👶 乳幼児期のコミュニケーション方法
                </li>
                <li className="text-[#444444] text-lg ">
                  🧒 学童期の自尊心の育て方
                </li>
                <li className="text-[#444444] text-lg ">
                  🧑 思春期の子どもとの向き合い方
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ セクション */}
        <section
          id="faq"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2
                className="text-3xl font-bold text-center mb-12 text-[#4CAF50]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                FAQ
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-2">
                    <h3 className="text-xl font-bold mb-2 text-[#4CAF50]">
                      {faq.question}
                    </h3>
                    <p className="text-[#444444]">{faq.answer}</p>
                    {index < faqs.length && (
                      <hr className="my-2 border-t-2 border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button className="bg-[#4CAF50] text-white px-6 py-2 rounded-full hover:bg-[#45a049] transition-colors inline-flex items-center">
                  全てのFAQを見る
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* User's Voice セクション */}
        <section
          id="users-voice"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2
                className="text-3xl font-bold text-center mb-12 text-[#FF8C00]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                User's Voice
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {userVoices.map((voice, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-3xl shadow-md"
                  >
                    <Image
                      src={voice.bookImage}
                      alt={voice.bookTitle}
                      width={200}
                      height={200}
                      className="mx-auto mb-4 rounded-lg"
                    />
                    <h3 className="text-xl font-bold mb-2 text-[#FF8C00]">
                      {voice.name}
                    </h3>
                    <p className="text-[#444444] mb-4">{voice.comment}</p>
                    <p className="text-[#8D6E63] font-bold">
                      {voice.bookTitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* コンタクトフォーム */}
        <section
          id="contact"
          className="py-12 text-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2
                className="text-3xl font-bold text-center mb-8 text-[#4CAF50]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                CONTACT
              </h2>
              <div className="text-center max-w-3xl mx-auto px-4">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-[#444444]"
                    >
                      お名前
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-[#4CAF50] rounded-full shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-[#444444]"
                    >
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-[#4CAF50] rounded-full shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#444444]"
                    >
                      メッセージ
                    </label>
                    <textarea
                      id="message"
                      className="w-full px-3 py-2 border border-[#4CAF50] rounded-3xl shadow-sm focus:outline-none focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className=" bg-[#4CAF50] text-white py-2 px-6 rounded-full hover:bg-[#45a049] transition-colors"
                  >
                    送信する
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-[#FF8C00] text-white py-8 rounded-t-3xl mt-8">
          <div className="container mx-auto text-center px-4">
            <p className="font-bold">
              &copy; 2024 Tellry. All rights reserved.
            </p>
            <div className="mt-4">
              <Link
                href="#"
                className="mx-2 hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="mx-2 hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="mx-2 hover:text-[#FFE4B5] transition-colors duration-200 font-bold"
              >
                Instagram
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
