"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getChildId, updateChild } from "@/lib/api";
import ChildForm from "@/components/EditChild/ChildForm";

export default function EditChild({ params }: { params: { id: string } }) {
  const [child, setChild] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    arrival_date: "",
    gender: "no_answer",
    interests: "",
    background_type: "special_adoption",
    background_other: "",
    origin_background: "",
    care_background: "",
    family_structure: "",
    father_title: "",
    mother_title: "",
  });
  const [showArrivalDate, setShowArrivalDate] = useState(true);
  const [showBackgroundOther, setShowBackgroundOther] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      // 子ども情報[id]をGET
      getChildId(params.id)
        .then((data) => {
          setChild(data);
          setFormData(data);

          if (
            data.background_type === "sperm_donation" ||
            data.background_type === "egg_donation"
          ) {
            setShowArrivalDate(false);
          } else {
            setShowArrivalDate(true);
          }
          if (data.background_type === "other") {
            setShowBackgroundOther(true);
          } else {
            setShowBackgroundOther(false);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch child data:", error);
        });
    }
  }, [params.id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "background_type") {
      if (value === "sperm_donation" || value === "egg_donation") {
        setShowArrivalDate(false);
      } else {
        setShowArrivalDate(true);
      }
      if (value === "other") {
        setShowBackgroundOther(true);
      } else {
        setShowBackgroundOther(false);
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // 子ども情報をPUT
    const response = await updateChild(params.id, formData);

    if (response.ok) {
      router.push("/home");
    } else {
      alert("Error updating child.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">入力情報を確認してください</h1>
      {child ? (
        <ChildForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showArrivalDate={showArrivalDate}
          showBackgroundOther={showBackgroundOther}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
