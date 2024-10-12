import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

interface ChildFormProps {
  formData: any;
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
  showArrivalDate: boolean;
  showBackgroundOther: boolean;
}

const backgroundLabels: any = {
  special_adoption: {
    originLabel:
      "お子さまが元のご家族で育てられなかった背景について、可能な範囲でお教えいただけますか？",
    originExample:
      "お子さまの生まれたご両親は、当時非常に若く、経済的にも精神的にも子育てが難しい状況でした。そのため、私たちは養子縁組を通じてお迎えすることになりました。",
    careLabel:
      "ご家族が特別養子縁組を選んだ経緯や、お子さまが家族の一員になった経緯について教えてください。",
    careExample:
      "私たちは長い間子どもを望んでいましたが、自然に恵まれなかったため、養子縁組という形で家族を作る決断をしました。お子さまが来た日から、家族としての絆が少しずつ深まっていきました。",
  },
  foster_regular_adoption: {
    originLabel:
      "お子さまが元のご家族で育てられなかった理由について、教えていただけますか？",
    originExample:
      "お子さまの生まれたご両親は、家庭の事情で長期的に子育てができなくなり、私たちが里親としてお子さまを迎え入れることになりました。",
    careLabel:
      "里子・養子縁組を通じてどのようにしてご家族になられたのか、その過程を教えてください。",
    careExample:
      "私たちは里親登録をして数年後、お子さまと出会いました。最初は短期間の里親の予定でしたが、家族としての絆が強くなり、最終的に養子縁組を決意しました。",
  },
  sperm_donation: {
    originLabel:
      "精子提供に至った背景について、どのような経緯があったのかお聞かせください。",
    originExample:
      "私たちは長年不妊治療を続けてきましたが、自然妊娠が難しいという診断を受け、精子提供という選択肢を検討しました。最終的に、その方法で家族を迎え入れることを決めました。",
    careLabel:
      "精子提供を経て、どのようにしてご家族が一緒に歩み始めたのか、その過程について教えてください。",
    careExample:
      "提供者の協力のもと、無事に妊娠・出産を迎え、お子さまが誕生しました。家族全員で一歩一歩、新しい生活に順応しながら、愛情を深めていきました。",
  },
  egg_donation: {
    originLabel:
      "卵子提供に至った背景について、どのような経緯があったのかお聞かせください。",
    originExample:
      "体質的に自分の卵子で妊娠することが難しいと分かり、卵子提供を受けることにしました。たくさんの悩みと考慮を重ねた結果、この方法で家族を作る決断をしました。",
    careLabel:
      "卵子提供を経て、どのようにしてご家族が一緒に歩み始めたのか、その過程について教えてください。",
    careExample:
      "提供者のおかげで、無事に妊娠し、お子さまが誕生しました。新しい家族としての生活が始まり、日々お子さまとともに成長しています。",
  },
  step_family: {
    originLabel:
      "ご家族がステップファミリーになった背景や、お子さまとの関係がどのように形作られたのか教えてください。",
    originExample:
      "私とパートナーが再婚し、ステップファミリーとしての新しい生活が始まりました。最初は戸惑いもありましたが、お互いを理解し合いながら少しずつ絆を深めていきました。",
    careLabel:
      "ステップファミリーとしての新しい家族の形ができるまでの過程について、お教えいただけますか？",
    careExample:
      "家族全員で時間をかけて互いの存在に慣れ、家族としての一体感が少しずつ築かれていきました。今では、笑顔と愛情にあふれた毎日を過ごしています。",
  },
  other: {
    originLabel:
      "お子さまが元のご家族で育てられなかった背景について、またご家族となるまでの特別な経緯について教えてください。",
    originExample:
      "お子さまが育てられなかった理由は複雑ですが、様々な事情が重なり、私たちが家族としてお迎えすることになりました。その過程で、たくさんの困難と向き合いましたが、今では新しい家族として幸せな日々を過ごしています。",
    careLabel:
      "その他の背景について、どのようにしてお子さまとご家族が一緒になったのか、その過程を教えてください。",
    careExample:
      "私たちの家族は少し特別な形で結ばれましたが、運命のようにお子さまと出会い、家族としての生活を始めました。今では、お互いを大切にし合う絆が生まれています。",
  },
};

export default function ChildForm({
  formData,
  handleChange,
  handleSubmit,
  showArrivalDate,
  showBackgroundOther,
}: ChildFormProps) {
  const currentBackground = backgroundLabels[formData.background_type] || {};
  const router = useRouter();
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">お子さまのおなまえ/ニックネーム*</label>
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
            <option value="foster_regular_adoption">里子・普通養子縁組</option>
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
          <label className="block mb-2">{currentBackground.originLabel}</label>
          <p className="text-sm text-gray-500 mt-2">
            例: {currentBackground.originExample}
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
            例: {currentBackground.careExample}
          </p>
          <textarea
            name="care_background"
            value={formData.care_background}
            onChange={handleChange}
            className="w-full h-32 p-2 mb-1 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md  hover:bg-orange-600 focus:outline-none shadow-md"
        >
          完了
        </button>
      </form>
      <div className="mt-8">
        <Button
          onClick={() => {
            const confirmLeave = window.confirm(
              "入力した内容は破棄されます。ホームに戻りますか？"
            );
            if (confirmLeave) {
              router.push("/home");
            }
          }}
        >
          ホームに戻る
        </Button>
      </div>
    </>
  );
}
