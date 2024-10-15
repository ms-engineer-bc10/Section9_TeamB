"use client";
import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useRedirectIfAuthenticated } from "@/lib/auth";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useRedirectIfAuthenticated();

  // 認証メールを再送信する関数
  const handleResendVerificationEmail = async () => {
    if (auth.currentUser) {
      setIsSending(true);
      setError(null);
      try {
        await sendEmailVerification(auth.currentUser);
        setIsSent(true);
      } catch (error) {
        setError("認証メールの再送信に失敗しました。再度お試しください。");
        console.error("Error sending verification email:", error);
      } finally {
        setIsSending(false);
      }
    }
  };

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">メール認証が必要です</h2>
        <p className="mb-4">
          ご登録いただいたメールアドレスに認証メールを送信しました。メールを確認し、アカウントを認証してください。
        </p>
        {isSent && (
          <p className="text-green-500 mb-4">
            認証メールを再送信しました。メールボックスを確認してください。
          </p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleResendVerificationEmail}
          disabled={isSending}
          className={`w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? "送信中..." : "認証メールを再送信"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          認証が完了したら、ページを再読み込みしてください。
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
