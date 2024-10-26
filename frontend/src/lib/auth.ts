//認証のロジック（認証状態のチェックやユーザー情報の取得）
"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const handleLogout = async (router: ReturnType<typeof useRouter>) => {
  try {
    await auth.signOut(); // Firebaseからログアウト
    router.push("/login"); // ログインページへリダイレクト
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
