"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { apiUrl } from "@/lib/config";

const ChildInfoForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const [step, setStep] = useState(1);

  const onSubmit = async (data: any) => {
    try {
      const postData = {
        name: data.name,
        birth_date: data.birthDate,
        arrival_date: data.arrivalDate,
        gender:
          data.gender === "male"
            ? "boy"
            : data.gender === "female"
            ? "girl"
            : "no_answer",
        interests: data.interests,
        background_type: (() => {
          switch (data.backgroundType) {
            case "特別養子縁組":
              return "special_adoption";
            case "里子・普通養子縁組":
              return "foster_regular_adoption";
            case "精子提供":
              return "sperm_donation";
            case "卵子提供":
              return "egg_donation";
            case "ステップファミリー":
              return "step_family";
            case "その他":
              return "other";
            default:
              return null;
          }
        })(),
        background_other: data.backgroundOther || null,
        origin_background: data.originBackground,
        care_background: data.careBackground,
        family_structure: data.familyStructure,
        father_title: data.fatherTitle,
        mother_title: data.motherTitle,
        user: 1, // ユーザーID
      };

      console.log("送信するデータ:", postData);

      const response = await fetch(`${apiUrl}/api/children/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log("子供情報が正常に送信されました");
      } else {
        console.error("送信エラーが発生しました");
      }
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {step === 1 && (
        <div>
          <label>子供の名前</label>
          <input type="text" {...register("name")} className="input" />
          <label>誕生日</label>
          <input type="date" {...register("birthDate")} className="input" />
          <label>性別</label>
          <select {...register("gender")} className="input">
            <option value="male">男の子</option>
            <option value="female">女の子</option>
            <option value="other">その他</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>家族構成を教えてください</label>
          <input
            type="text"
            {...register("familyStructure")}
            className="input"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block mb-2">
            お子さまからなんと呼ばれていますか
          </label>
          <input
            {...register("fatherTitle")}
            type="text"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            {...register("motherTitle")}
            type="text"
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <label className="block mb-2">
            お子さんの好きなものを教えてください
          </label>
          <input
            {...register("interests")}
            type="text"
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
      )}

      {step === 5 && (
        <div>
          <label className="block mb-2">
            どのような経緯でご家族になりましたか
          </label>
          <select
            {...register("backgroundType")}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="特別養子縁組">特別養子縁組</option>
            <option value="里子・普通養子縁組">里子・普通養子縁組</option>
            <option value="精子提供">精子提供</option>
            <option value="卵子提供">卵子提供</option>
            <option value="ステップファミリー">ステップファミリー</option>
            <option value="その他">その他</option>
          </select>
          <label className="block mb-2">
            お子さんを迎えた日を教えてください
          </label>
          <input
            {...register("arrivalDate")}
            type="date"
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
      )}

      {step === 6 && (
        <div>
          <label className="block mb-2">
            お子さんを育てられなかった背景を教えてください
          </label>
          <input
            {...register("originBackground")}
            type="text"
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
      )}

      {step === 7 && (
        <div>
          <label>ご家族になった背景を教えてください</label>
          <textarea
            {...register("careBackground")}
            className="input"
          ></textarea>
        </div>
      )}

      {step === 8 && (
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          完了
        </button>
      )}

      <div className="mt-4 flex justify-between">
        {step > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="p-2 bg-gray-300 text-gray-800 rounded"
          >
            戻る
          </button>
        )}
        {step < 8 && (
          <button
            type="button"
            onClick={nextStep}
            className="p-2 bg-blue-500 text-white rounded"
          >
            次へ
          </button>
        )}
      </div>
    </form>
  );
};

export default ChildInfoForm;
