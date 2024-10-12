"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getChildId } from "@/lib/api"; // 子ども情報を取得する関数

const ChildDetail = () => {
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    gender: "",
    family_structure: "",
    father_title: "",
    mother_title: "",
    interests: "",
    background_type: "",
    background_other: "",
    arrival_date: "",
    origin_background: "",
    care_background: "",
  });

  const [loading, setLoading] = useState(true);
  const params = useParams(); // next/navigationのuseParamsを使用
  const router = useRouter();

  // 型ガードでparams.idをstringに変換
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const fetchChildData = async () => {
      if (id) {
        try {
          const data = await getChildId(id); // 子ども情報をAPIから取得
          setFormData(data);
        } catch (error) {
          console.error("Error fetching child data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchChildData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          お子さまの情報
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              お子さまのおなまえ/ニックネーム
            </label>
            <div className="mt-1 text-gray-900">{formData.name}</div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              お誕生日
            </label>
            <div className="mt-1 text-gray-900">{formData.birth_date}</div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              性別
            </label>
            <div className="mt-1 text-gray-900">
              {formData.gender === "boy"
                ? "男の子"
                : formData.gender === "girl"
                ? "女の子"
                : "答えたくない"}
            </div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              ご家族構成
            </label>
            <div className="mt-1 text-gray-900">
              {formData.family_structure}
            </div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              お子さまからどのように呼ばれていますか？
            </label>
            <div className="mt-1 text-gray-900">
              {formData.father_title} / {formData.mother_title}
            </div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              お子さまの好きなもの・こと
            </label>
            <div className="mt-1 text-gray-900">{formData.interests}</div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              どのような経緯でご家族になりましたか？
            </label>
            <div className="mt-1 text-gray-900">
              {formData.background_type === "special_adoption"
                ? "特別養子縁組"
                : formData.background_type === "foster_regular_adoption"
                ? "里子・普通養子縁組"
                : formData.background_type === "sperm_donation"
                ? "精子提供"
                : formData.background_type === "egg_donation"
                ? "卵子提供"
                : formData.background_type === "step_family"
                ? "ステップファミリー"
                : "その他"}
            </div>
            <hr className="my-4" />
          </div>

          {formData.background_other && (
            <div>
              <label className="block text-lg font-medium text-gray-700">
                その他の背景
              </label>
              <div className="mt-1 text-gray-900">
                {formData.background_other}
              </div>
              <hr className="my-4" />
            </div>
          )}

          {formData.arrival_date && (
            <div>
              <label className="block text-lg font-medium text-gray-700">
                お子さまを迎えた日
              </label>
              <div className="mt-1 text-gray-900">{formData.arrival_date}</div>
              <hr className="my-4" />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium text-gray-700">
              出自背景
            </label>
            <div className="mt-1 text-gray-900">
              {formData.origin_background}
            </div>
            <hr className="my-4" />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              養育背景
            </label>
            <div className="mt-1 text-gray-900">{formData.care_background}</div>
            <hr className="my-4" />
          </div>

          <div className="mt-8">
            <button
              onClick={() => router.push("/home")}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none shadow-md"
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDetail;
