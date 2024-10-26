"use client";
import Loading from "@/components/Loading";
import LightPlan from "@/components/plan/LightPlan";
import StandardPlan from "@/components/plan/StandardPlan";
import { fetchMembershipStatus } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Plan = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembership = async () => {
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
        setLoading(false);
      }
    };

    fetchMembership();
  }, [user]);

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
