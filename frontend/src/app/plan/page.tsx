"use client";
import Loading from "@/components/Loading";
import LightPlan from "@/components/plan/LightPlan";
import StandardPlan from "@/components/plan/StandardPlan";
import { fetchMembershipStatus } from "@/lib/api";
import { auth } from "@/lib/firebase";
import React, { useEffect, useState } from "react";

const Plan = () => {
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const membershipData = await fetchMembershipStatus(token);
          setMembershipStatus(membershipData.status);
        } catch (error) {
          console.error("Error fetching token or membership status:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("User is not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {membershipStatus === "standard" ? (
        <StandardPlan />
      ) : membershipStatus === "light" ? (
        <LightPlan />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Plan;
