"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditChild({ params }: { params: { id: string } }) {
  const [child, setChild] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    arrival_date: "",
    gender: "no_answer",
    interests: "",
    background_type: "special_adoption",
    origin_background: "",
    care_background: "",
    family_structure: "",
    father_title: "",
    mother_title: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetch(`http://localhost:8000/api/children/${params.id}/`)
        .then((response) => response.json())
        .then((data) => {
          setChild(data);
          setFormData(data);
        });
    }
  }, [params.id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/children/${params.id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Child updated successfully!");
      router.push("/"); // Redirect to homepage or wherever appropriate
    } else {
      alert("Error updating child.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">入力情報を確認してください</h1>
      {child ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お子さまのおなまえ/ニックネーム*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お誕生日*
            </label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              性別*
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="boy">男の子</option>
              <option value="girl">女の子</option>
              <option value="not_answer">答えたくない</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ご家族構成を教えてください
            </label>
            <input
              type="text"
              name="family_structure"
              placeholder="例：父、母、子"
              value={formData.family_structure}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お子さまからどのように呼ばれていますか？
            </label>
            <input
              type="text"
              name="father_title"
              placeholder="例：ぱぱ、おとうさん、ダディ"
              value={formData.father_title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <input
              type="text"
              name="mother_title"
              placeholder="例：まま、おかあさん、マミー"
              value={formData.mother_title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お子さまの好きなもの・ことを教えてください
            </label>
            <textarea
              name="care_background"
              placeholder="例： 恐竜、おままごと、砂場遊び"
              value={formData.interests}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              どのような経緯でご家族になりましたか？*
            </label>
            <select
              name="background_type"
              value={formData.background_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お子さまを迎えた日を教えてください
            </label>
            <input
              type="date"
              name="arrival_date"
              value={formData.arrival_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お子さまを育てられなかった背景を教えてください
            </label>
            <textarea
              name="origin_background"
              value={formData.origin_background}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ご家族になった背景を教えてください
            </label>
            <textarea
              name="care_background"
              value={formData.care_background}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            完了
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
