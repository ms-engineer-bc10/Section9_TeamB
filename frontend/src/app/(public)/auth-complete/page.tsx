"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Loading from "@/components/Loading";

const AuthCompletePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (!oobCode || !mode) {
      setError("Invalid request.");
      setLoading(false);
      return;
    }

    const handleAction = async () => {
      try {
        if (mode === "verifyEmail") {
          await applyActionCode(auth, oobCode as string);
          onAuthStateChanged(auth, (user) => {
            if (user) {
              user.reload().then(() => {
                if (user.emailVerified) {
                  setLoading(false);
                  router.push("/home");
                } else {
                  setError("Email not verified yet.");
                }
              });
            }
          });
        } else {
          setError("Unknown action.");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to complete action.");
        setLoading(false);
      }
    };

    handleAction();
  }, [oobCode, mode, router, auth]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          メールアドレスを確認しました。
        </h1>
        <p className="text-lg">画面が自動的に遷移するまでお待ちください。</p>
      </div>
    </div>
  );
};

export default AuthCompletePage;
