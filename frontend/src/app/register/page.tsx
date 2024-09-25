"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Header from "@/components/Header";

const Register: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ name, email, password }) => {
    try {
      // Firebase でのユーザー作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ユーザー名の更新
      if (user) {
        await updateProfile(user, {
          displayName: name,
        });
        alert("登録が完了しました");
      }

      // フォームのリセット
      reset();
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">新規登録</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">名前</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("name", { required: true })}
              placeholder="名前を入力"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("email", { required: true })}
              placeholder="メールアドレスを入力"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">パスワード</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              {...register("password", { required: true })}
              placeholder="パスワードを入力"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            登録
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
