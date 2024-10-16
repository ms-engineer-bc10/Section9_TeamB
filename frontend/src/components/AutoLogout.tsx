"use client";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const AutoLogout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // 1時間後に自動的にログアウト（3600000ms = 1時間）
    const timer = setTimeout(() => {
      signOut(auth)
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          console.error("ログアウトエラー:", error);
        });
    }, 3600000);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
};

export default AutoLogout;
