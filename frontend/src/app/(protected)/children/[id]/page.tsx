"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getChildId, updateChild, createBook } from "@/lib/api";
import ChildForm from "@/components/EditChild/ChildForm";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function EditChild({ params }: { params: { id: string } }) {
  const { user } = useAuth();
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (!user) {
        console.error("ユーザーがログインしていません");
        return;
      }

      const token = await user.getIdToken(true); // トークンを取得

      // PUTで子ども情報を更新
      const response = await updateChild(params.id, formData);

      if (!response.ok) {
        throw new Error("子ども情報の更新に失敗しました。");
      }

      // 絵本生成リクエスト
      await createBook(token, Number(params.id));

      // 絵本生成中のメッセージを表示
      setMessage("絵本を生成中です。完了しましたらメールでお知らせします。");

      // 5秒後にホームにリダイレクト
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
      setError(
        error instanceof Error ? error.message : "予期せぬエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {child ? (
        <ChildForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showArrivalDate={showArrivalDate}
          showBackgroundOther={showBackgroundOther}
          isLoading={isLoading}
          error={error}
          message={message}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
