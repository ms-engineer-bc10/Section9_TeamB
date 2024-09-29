"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/config";
import { genderMap, backgroundTypeMap, ChildFormData } from "@/types";

const ChildInfoForm = () => {
  const { register, handleSubmit, watch } = useForm<ChildFormData>();
  const [step, setStep] = useState(1);
  const router = useRouter();

  const selectedBackgroundType = watch("backgroundType");

  const onSubmit = async (data: ChildFormData) => {
    try {
      const postData = {
        name: data.name,
        birth_date: data.birthDate,
        arrival_date: data.arrivalDate,
        gender: genderMap[data.gender] || "no_answer",
        interests: data.interests,
        background_type: backgroundTypeMap[data.backgroundType] || null,
        background_other: data.backgroundOther || null,
        origin_background: data.originBackground,
        care_background: data.careBackground,
        family_structure: data.familyStructure,
        father_title: data.fatherTitle,
        mother_title: data.motherTitle,
        user: 1,
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
        router.push("/home");
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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div>
              <label className="block mb-2">子供の名前</label>
              <input
                type="text"
                {...register("name")}
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="block mb-2">誕生日</label>
              <input
                type="date"
                {...register("birthDate")}
                className="w-full p-2 mb-4 border rounded"
              />
              <label className="block mb-2">性別</label>
              <select
                {...register("gender")}
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="other">未選択</option>
                <option value="boy">男の子</option>
                <option value="girl">女の子</option>
              </select>
            </div>
          )}

          {step === 2 && (
            <div>
              <label>家族構成を教えてください</label>
              <input
                type="text"
                {...register("familyStructure")}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block mb-2">
                お子さまからどのように呼ばれていますか
              </label>
              <label>例：ぱぱ、おとうさん</label>
              <input
                {...register("fatherTitle")}
                type="text"
                className="w-full p-2 mb-4 border rounded"
              />
              <label>例：まま、おかあさん</label>
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
                お子さまの好きなものを教えてください
              </label>
              <textarea
                {...register("interests")}
                className="w-full p-2 mb-4 border rounded h-24"
              ></textarea>
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
                <option value="special_adoption">特別養子縁組</option>
                <option value="foster_regular_adoption">
                  里子・普通養子縁組
                </option>
                <option value="sperm_donation">精子提供</option>
                <option value="egg_donation">卵子提供</option>
                <option value="step_family">ステップファミリー</option>
                <option value="other">その他</option>
              </select>

              {selectedBackgroundType === "other" && (
                <div>
                  <label className="block mb-2">
                    その他の背景を教えてください
                  </label>
                  <input
                    {...register("backgroundOther")}
                    type="text"
                    className="w-full p-2 mb-4 border rounded"
                  />
                </div>
              )}

              {selectedBackgroundType !== "sperm_donation" &&
                selectedBackgroundType !== "egg_donation" && (
                  <div>
                    <label className="block mb-2">
                      お子さまを迎えた日を教えてください
                    </label>
                    <input
                      {...register("arrivalDate")}
                      type="date"
                      className="w-full p-2 mb-4 border rounded"
                    />
                  </div>
                )}
            </div>
          )}

          {step === 6 && (
            <div>
              <label className="block mb-2">
                お子さまを育てられなかった背景を教えてください
              </label>
              <textarea
                {...register("originBackground")}
                className="w-full p-2 mb-4 border rounded h-24"
              ></textarea>
            </div>
          )}

          {step === 7 && (
            <div>
              <label>ご家族になった背景を教えてください</label>
              <textarea
                {...register("careBackground")}
                className="w-full p-2 mb-4 border rounded h-24"
              ></textarea>
            </div>
          )}

          {step === 8 && (
            <div>
              <p>ご回答ありがとうございます。</p>
              <p>素敵な絵本を作りましょう✨</p>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded h-12"
              >
                完了
              </button>
            </div>
          )}
        </form>

        <div className="mt-4 flex justify-between w-full max-w-md h-12">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`p-2 rounded h-full ${
              step === 1 ? "invisible" : "bg-gray-300 text-gray-800"
            }`}
          >
            戻る
          </button>
          {step < 8 && (
            <button
              type="button"
              onClick={nextStep}
              className="p-2 bg-blue-500 text-white rounded h-full"
            >
              次へ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildInfoForm;
