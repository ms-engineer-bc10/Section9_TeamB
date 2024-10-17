"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
