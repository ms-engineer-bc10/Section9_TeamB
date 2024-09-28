"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      // Firebaseでのログイン処理
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ユーザーがログインに成功した場合にリダイレクト
      if (user) {
        router.push("/home");
      }

      reset();
    } catch (error: any) {
      // Firebaseのエラーハンドリング
      if (error.code === "auth/user-not-found") {
        setError("email", {
          type: "manual",
          message: "このメールアドレスは登録されていません",
        });
      } else if (error.code === "auth/wrong-password") {
        setError("password", {
          type: "manual",
          message: "パスワードが間違っています",
        });
      } else {
        console.error("エラーが発生しました:", error);
        alert("ログインに失敗しました");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">ログイン</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              メールアドレス
            </label>
            {errors.email?.message && (
              <p className="text-red-500 text-xs">{errors.email?.message}</p>
            )}
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("email", {
                required: "メールアドレスを入力してください",
              })}
              placeholder="メールアドレスを入力"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">パスワード</label>
            {errors.password?.message && (
              <p className="text-red-500 text-xs">{errors.password?.message}</p>
            )}
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("password", {
                required: "パスワードを入力してください",
              })}
              placeholder="パスワードを入力"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};

export default login;

