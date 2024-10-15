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

// ログインしているかつメールアドレス認証が完了しているユーザーをリダイレクトするカスタムフック
export const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          router.push("/home");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);
};

// ログインしていないユーザーをリダイレクトするカスタムフック
export const useRedirectIfNotAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);
};
