"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

const AuthCompletePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");
  const { user } = useAuth();

  useEffect(() => {
    if (!oobCode || !mode) {
      setError("Invalid request.");
      setLoading(false);
      return;
    }

    const handleAction = async () => {
      try {
        switch (mode) {
          case "verifyEmail":
            await applyActionCode(auth, oobCode as string);
            break;
          case "resetPassword":
            router.push("/reset-password?oobCode=" + oobCode);
            return;
          default:
            setError("Unknown action.");
            setLoading(false);
            return;
        }

        setLoading(false);
        router.push("/home");
      } catch (error) {
        console.error(error);
        setError("Failed to complete action.");
        setLoading(false);
      }
    };

    handleAction();
  }, [oobCode, mode, router]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Action Completed</h1>
      {user ? (
        <p>Redirecting to the home page...</p>
      ) : (
        <p>Authentication is required.</p>
      )}
    </div>
  );
};

export default AuthCompletePage;
