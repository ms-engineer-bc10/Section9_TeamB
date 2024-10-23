import React from "react";
import { useRouter } from "next/navigation";
import { Home, Send } from "lucide-react";
import { backgroundLabels } from "@/lib/backgroundLabels";

interface ChildFormProps {
  formData: any;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
  showArrivalDate: boolean;
  showBackgroundOther: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

export default function ChildForm({
  formData,
  handleChange,
  handleSubmit,
  showArrivalDate,
  showBackgroundOther,
  isLoading,
  error,
  message,
}: ChildFormProps) {
  const currentBackground = backgroundLabels[formData.background_type] || {};
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <h1 className="text-4xl font-bold text-orange-600 font-comic mb-8 text-center">
          お子さま情報入力
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">
              お子さまのおなまえ/ニックネーム*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">お誕生日*</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">性別*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
            >
              <option value="boy">男の子</option>
              <option value="girl">女の子</option>
              <option value="not_answer">答えたくない</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">ご家族構成を教えてください</label>
            <input
              type="text"
              name="family_structure"
              placeholder="例：父、母、子"
              value={formData.family_structure}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">
              お子さまからどのように呼ばれていますか？
            </label>
            <input
              type="text"
              name="father_title"
              placeholder="例：ぱぱ、おとうさん、ダディ"
              value={formData.father_title}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
            />
            <input
              type="text"
              name="mother_title"
              placeholder="例：まま、おかあさん、マミー"
              value={formData.mother_title}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">
              お子さまの好きなもの・ことを教えてください
            </label>
            <textarea
              name="interests"
              placeholder="例： 恐竜、おままごと、砂場遊び"
              value={formData.interests}
              onChange={handleChange}
              className="w-full h-24 p-2 mb-1 border rounded"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">
              どのような経緯でご家族になりましたか？*
            </label>
            <select
              name="background_type"
              value={formData.background_type}
              onChange={handleChange}
              className="w-full p-2 mb-1 border rounded"
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
          </div>

          {showBackgroundOther && (
            <div>
              <label className="block mb-2">その他の背景を教えてください</label>
              <textarea
                name="background_other"
                value={formData.background_other ?? ""}
                onChange={handleChange}
                className="w-full p-2 mb-1 border rounded"
              ></textarea>
            </div>
          )}

          {showArrivalDate && (
            <div>
              <label className="block mb-2">
                お子さまを迎えた日を教えてください
              </label>
              <input
                type="date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleChange}
                className="w-full p-2 mb-1 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block mb-2">
              {currentBackground.originLabel}
            </label>
            <p className="text-sm text-gray-500 mt-2">
              {currentBackground.originExample}
            </p>
            <textarea
              name="origin_background"
              value={formData.origin_background}
              onChange={handleChange}
              className="w-full h-32 p-2 mb-1 border rounded"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2">{currentBackground.careLabel}</label>
            <p className="text-sm text-gray-500 mt-2">
              {currentBackground.careExample}
            </p>
            <textarea
              name="care_background"
              value={formData.care_background}
              onChange={handleChange}
              className="w-full h-32 p-2 mb-1 border rounded"
            ></textarea>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => {
                const confirmLeave = window.confirm(
                  "入力した内容は破棄されます。ホームに戻りますか？"
                );
                if (confirmLeave) {
                  router.push("/home");
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
            >
              <Home className="mr-2" size={20} />
              ホームに戻る
            </button>
            <div className="text-center">
              {isLoading && <p className="text-orange-500">Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {message && <p className="text-green-500">{message}</p>}
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
            >
              <Send className="mr-2" size={20} />
              完了
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
