"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/config";
import { Inputs } from "@/types";
import Link from "next/link";
import { useRedirectIfAuthenticated } from "@/lib/auth";

const Register: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  useRedirectIfAuthenticated();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      // Firebaseでのユーザー作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ユーザー情報をDjangoに送信
      const response = await fetch(`${apiUrl}/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          firebase_uid: user.uid,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        // サーバーからのエラーメッセージの処理
        if (data.error && data.error.includes("既に登録されています")) {
          setError("email", {
            type: "manual",
            message: "既に登録されているメールアドレスです",
          });
        } else {
          throw new Error("Django APIへのリクエストに失敗しました");
        }
      } else {
        if (user) {
          router.push("/children");
        }

        reset();
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "このメールアドレスは既に登録されています",
        });
      } else {
        console.error("エラーが発生しました:", error);
        alert("登録に失敗しました");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">新規登録</h2>

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
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            登録
          </button>

          <p className="mt-4 text-center text-sm">
            すでにアカウントをお持ちの方は{" "}
            <Link href="/login" className="text-orange-700 hover:underline">
              こちら
            </Link>
            からログインしてください。
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
