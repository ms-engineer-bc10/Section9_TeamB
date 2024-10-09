"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { fetchMembershipStatus } from "@/lib/api";

const MembershipStatus: React.FC = () => {
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        console.error("ユーザーがログインしていません");
        return;
      }

      try {
        const idToken = await currentUser.getIdToken(true);
        const data = await fetchMembershipStatus(idToken);
        setMembershipStatus(data.status);
      } catch (error) {
        console.error("Error fetching membership status:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {membershipStatus === "custom" ? (
        <p className="text-lg font-semibold text-green-600">カスタムプラン</p>
      ) : membershipStatus === "select" ? (
        <p className="text-lg font-semibold text-blue-600">セレクトプラン</p>
      ) : (
        <p className="text-lg">会員ステータスを取得中...</p>
      )}
    </div>
  );
};

export default MembershipStatus;
