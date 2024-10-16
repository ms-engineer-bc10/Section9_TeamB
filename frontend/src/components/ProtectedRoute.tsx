"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (!user.emailVerified) {
        router.push("/verify-email");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default ProtectedRoute;
