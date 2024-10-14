"use client";

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Star, Book, FileText, Baby, Lightbulb, Heart, Clock } from "lucide-react";

export default function HomePage() {
  const features = [
    { title: "パーソナライズされた絵本", desc: "あなたのお子様にピッタリのストーリーを作ろう！", icon: <Book className="w-12 h-12 text-[#FF9999]" /> },
    { title: "PDFで簡単保存", desc: "作った絵本をPDFで印刷しよう。", icon: <FileText className="w-12 h-12 text-[#99CCFF]" /> },
    { title: "成長に合わせたお話", desc: "お子様の年齢に合わせたお話を選べます。", icon: <Baby className="w-12 h-12 text-[#FFCC99]" /> },
    { title: "シンプルで楽しい操作", desc: "簡単操作で誰でも楽しめます。", icon: <Lightbulb className="w-12 h-12 text-[#99FF99]" /> },
  ];

  return (
    <>
      <Head>
        <title>楽しい絵本アプリ - Tellry</title>
        <meta name="description" content="家族と一緒に成長するパーソナライズされた絵本を作りましょう！" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Indie+Flower&family=Sawarabi+Gothic&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-[#FFF3E0] font-playful min-h-screen" style={{ fontFamily: "'Sawarabi Gothic', sans-serif" }}>
        {/* ヘッダー */}
        <header className="bg-[#FFD6E0] shadow-md p-4 rounded-b-3xl">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-4xl font-bold" style={{ fontFamily: "'Indie Flower', cursive" }}>
              <span className="text-[#FF9999]">T</span>
              <span className="text-[#99CCFF]">e</span>
              <span className="text-[#FFCC99]">l</span>
              <span className="text-[#99FF99]">l</span>
              <span className="text-[#FF99CC]">r</span>
              <span className="text-[#FFFF99]">y</span>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="#home" className="text-[#FF9999] hover:text-[#FF7777] transition-colors duration-200 font-bold">HOME</Link></li>
                <li><Link href="#features" className="text-[#99CCFF] hover:text-[#77AADD] transition-colors duration-200 font-bold">FEATURES</Link></li>
                <li><Link href="#plan" className="text-[#FFCC99] hover:text-[#DDAA77] transition-colors duration-200 font-bold">PLAN</Link></li>
                <li><Link href="#advice" className="text-[#FF99CC] hover:text-[#DD77AA] transition-colors duration-200 font-bold">ADVICE</Link></li>
                <li><Link href="#contact" className="text-[#99FF99] hover:text-[#77DD77] transition-colors duration-200 font-bold">CONTACT</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* ヒーローセクション */}
        <section id="home" className="py-12 text-center relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 shadow-lg relative">
 
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Caveat', cursive" }}>
                  <span className="text-[#FF9999]">お</span>
                  <span className="text-[#99CCFF]">子</span>
                  <span className="text-[#FFCC99]">さ</span>
                  <span className="text-[#99FF99]">ま</span>
                  <span className="text-[#FF99CC]">に</span>
                  <span className="text-[#FFFF99]">家</span>
                  <span className="text-[#FF9999]">族</span>
                  <span className="text-[#99CCFF]">の</span>
                  <span className="text-[#FFCC99]">ス</span>
                  <span className="text-[#99FF99]">ト</span>
                  <span className="text-[#FF99CC]">ー</span>
                  <span className="text-[#FFFF99]">リ</span>
                  <span className="text-[#FF9999]">ー</span>
                  <span className="text-[#99CCFF]">を</span>
                  <span className="text-[#FFCC99]">お</span>
                  <span className="text-[#99FF99]">話</span>
                  <span className="text-[#FF99CC]">し</span>
                  <span className="text-[#FFFF99]">ま</span>
                  <span className="text-[#FF9999]">し</span>
                  <span className="text-[#99CCFF]">ょ</span>
                  <span className="text-[#FFCC99]">う</span>
                  <span className="text-[#99FF99]">！</span>
                </h1>
                <p className="text-xl mb-8 text-[#444444] font-bold">
                  オリジナルの家族の物語が簡単に作成できます！
                </p>
                <div className="flex justify-center items-center mb-8">
                  <Image
                    src="https://i.imgur.com/9XOH71a.jpeg"
                    alt="ヒーローセクションの背景"
                    width={400}
                    height={300}
                    className="object-cover rounded-3xl shadow-lg"
                  />
                  <div className="ml-8">
                    <Link href="/register">
                      <button className="bg-[#FF9999] text-white px-10 py-5 rounded-full text-xl hover:bg-[#FF7777] transition-all duration-200 transform hover:scale-105 shadow-lg">
                        今すぐはじめよう！
                      </button>
                    </Link>
                    <div className="mt-4">
                      <Link href="/login" className="text-[#99CCFF] text-sm hover:underline">登録済みの方はここちらからログイン</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-16 bg-[#E6F3FF] rounded-3xl mx-4">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#99CCFF] mb-10" style={{ fontFamily: "'Caveat', cursive" }}>FEATURES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow border-4 border-dashed border-[#FFCC99]">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#FF9999] mb-2">{feature.title}</h3>
                  <p className="text-[#444444] font-bold">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 料金プラン */}
        <section id="plan" className="py-16 bg-[#FFF5E6] rounded-3xl mx-4 mt-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#FFCC99]" style={{ fontFamily: "'Caveat', cursive" }}>PLAN</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* フリープラン */}
              <div 
                className="bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full cursor-pointer transition-all duration-200"
                onClick={() => {/* Add your click handler here */}}
                style={{ border: '4px solid transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.border = '4px solid #FF9966'}
                onMouseLeave={(e) => e.currentTarget.style.border = '4px solid transparent'}
              >
                <h3 className="text-2xl font-bold mb-4 text-center text-[#FF9999]">フリープラン</h3>
                <ul className="list-none p-0 mb-6">
                  <li className="mb-2 text-[#555555] text-lg font-bold">✨ 月1冊まで絵本作成</li>
                  <li className="mb-2 text-[#555555]] text-lg font-bold">🎨 基本テンプレート利用可能</li>
                  <li className="mb-2 text-[#555555]] text-lg font-bold">📁 PDFで簡単保存</li>
                </ul>
                <button className="w-full bg-[#FFCC99] text-white py-2 rounded-full hover:bg-[#FFB366] transition-colors">
                  さっそく無料トライ！
                </button>
              </div>
              {/* スタンダードプラン */}
              <div 
                className="bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full cursor-pointer transition-all duration-200 relative"
                onClick={() => {/* Add your click handler here */}}
                style={{ border: '4px solid transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.border = '4px solid #FF9966'}
                onMouseLeave={(e) => e.currentTarget.style.border = '4px solid transparent'}
              >
                <div className="absolute -top-5 -right-5 bg-[#FFCC99] text-white px-4 py-2 rounded-full transform rotate-12 shadow-md">
                  おすすめはこちら！
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-[#99CCFF]">スタンダードプラン</h3>
                <ul className="list-none p-0 mb-6">
                  <li className="mb-2 text-[#555555] text-lg font-bold">🌟 無制限の絵本作成</li>
                  <li className="mb-2 text-[#555555] text-lg font-bold">🎨 完全オリジナルストーリー</li>
                  <li className="mb-2 text-[#999999] text-lg font-bold">🖨️ 高品質印刷オプション(現在準備中)</li>
                  <li className="mb-2 text-[#999999] text-lg font-bold">🎤 音声ナレーション機能(現在準備中)</li>
                </ul>
              <Link href="http://localhost:3000/register">
                <button className="w-full bg-[#99CCFF] text-white py-2 rounded-full hover:bg-[#66B2FF] transition-colors">
                  今すぐはじめる
                </button>
              </Link>
              </div>
            </div>
          </div>
        </section>

        {/* アドバイスセクション（近日公開） */}
        <section id="advice" className="py-16 bg-[#FFF0F5] rounded-3xl mx-4 mt-8">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#FF99CC]" style={{ fontFamily: "'Caveat', cursive" }}>ADVICE</h2>
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <Clock className="w-16 h-16 text-[#FF99CC] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-[#FF99CC]">近日公開！</h3>
              <p className="text-[#444444] text-lg font-bold mb-4">
                保護者向けガイダンス・アドバイスセクションは現在準備中です。
              </p>
              <p className="text-[#444444] text-lg font-bold mb-4">
                専門家監修による、子どもの成長段階毎の心理状態や適切な声掛けなどのコンテンツをご提供予定です。
              </p>
              <ul className="list-none p-0 mt-6 space-y-2">
                <li className="text-[#444444] text-lg font-bold">👶 乳幼児期のコミュニケーション方法</li>
                <li className="text-[#444444] text-lg font-bold">🧒 学童期の自尊心の育て方</li>
                <li className="text-[#444444] text-lg font-bold">🧑 思春期の子どもとの向き合い方</li>
              </ul>
              <button className="mt-8 bg-[#FF99CC] text-white px-6  py-2 rounded-full hover:bg-[#FF77AA] transition-colors">
                公開をお知らせ
              </button>
            </div>
          </div>
        </section>

        {/* コンタクトフォーム */}
        <section id="contact" className="py-12 bg-[#F0FFF0] rounded-3xl mx-4 mt-8">
          <div className="container mx-auto px-4 max-w-md">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#99FF99]" style={{ fontFamily: "'Caveat', cursive" }}>CONTACT</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#444444]">お名前</label>
                <input type="text" id="name" className="w-full px-3 py-2 border border-[#99FF99] rounded-full shadow-sm focus:outline-none focus:ring-[#99FF99] focus:border-[#99FF99]" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#444444]">メールアドレス</label>
                <input type="email" id="email" className="w-full px-3 py-2 border border-[#99FF99] rounded-full shadow-sm focus:outline-none focus:ring-[#99FF99] focus:border-[#99FF99]" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#444444]">メッセージ</label>
                <textarea id="message" className="w-full px-3 py-2 border border-[#99FF99] rounded-3xl shadow-sm focus:outline-none focus:ring-[#99FF99] focus:border-[#99FF99]" rows="4" required></textarea>
              </div>
              <button type="submit" className="w-full bg-[#99FF99] text-white py-2 rounded-full hover:bg-[#66FF66] transition-colors">
                送信する
              </button>
            </form>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-[#FFD6E0] text-[#444444] py-8 rounded-t-3xl mt-8">
          <div className="container mx-auto text-center px-4">
            <p className="font-bold">&copy; 2024 Tellry. All rights reserved.</p>
            <div className="mt-4">
              <Link href="#" className="mx-2 hover:text-[#FF9999] transition-colors duration-200 font-bold">Facebook</Link>
              <Link href="#" className="mx-2 hover:text-[#99CCFF] transition-colors duration-200 font-bold">Twitter</Link>
              <Link href="#" className="mx-2 hover:text-[#FFCC99] transition-colors duration-200 font-bold">Instagram</Link>
            </div>
          </div>
        </footer>
      </div>

    </>
  );
}