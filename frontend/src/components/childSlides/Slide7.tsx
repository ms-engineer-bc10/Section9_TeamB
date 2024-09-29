import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide7Props {
  register: UseFormRegister<ChildFormData>;
  selectedBackgroundType: string;
}

export const Slide7 = ({ register, selectedBackgroundType }: Slide7Props) => {
  // 背景に基づく質問と例文を動的に変更
  let questionText = "ご家族になった背景を教えてください";
  let exampleText = "";

  switch (selectedBackgroundType) {
    case "special_adoption":
      questionText =
        "ご家族が特別養子縁組を選んだ経緯や、お子さまが家族の一員になった経緯について教えてください。";
      exampleText =
        "例: 私たちは長い間子どもを望んでいましたが、自然に恵まれなかったため、養子縁組という形で家族を作る決断をしました。この子が来た日から、家族としての絆が少しずつ深まっていきました。";
      break;
    case "foster_regular_adoption":
      questionText =
        "里子・養子縁組を通じてどのようにしてご家族になられたのか、その過程を教えてください。";
      exampleText =
        "例: 私たちは里親登録をして数年後、この子と出会いました。最初は短期間の里親の予定でしたが、家族としての絆が強くなり、最終的に養子縁組を決意しました。";
      break;
    case "sperm_donation":
      questionText =
        "精子提供を経て、どのようにしてご家族が一緒に歩み始めたのか、その過程について教えてください。";
      exampleText =
        "例: 提供者の協力のもと、無事に妊娠・出産を迎え、この子が誕生しました。家族全員で一歩一歩、新しい生活に順応しながら、愛情を深めていきました。";
      break;
    case "egg_donation":
      questionText =
        "卵子提供を経て、どのようにしてご家族が一緒に歩み始めたのか、その過程について教えてください。";
      exampleText =
        "例: 提供者のおかげで、無事に妊娠し、この子が誕生しました。新しい家族としての生活が始まり、日々こどもとともに成長しています。";
      break;
    case "step_family":
      questionText =
        "ステップファミリーとしての新しい家族の形ができるまでの過程について、お教えいただけますか？";
      exampleText =
        "例: 家族全員で時間をかけて互いの存在に慣れ、家族としての一体感が少しずつ築かれていきました。今では、笑顔と愛情にあふれた毎日を過ごしています。";
      break;
    case "other":
      questionText =
        "その他の背景について、どのようにしてお子さまとご家族が一緒になったのか、その過程を教えてください。";
      exampleText =
        "例: 私たちの家族は少し特別な形で結ばれましたが、運命のようにこの子と出会い、家族としての生活を始めました。今では、お互いを大切にし合う絆が生まれています。";
      break;
    default:
      questionText = "ご家族になった背景を教えてください";
      exampleText = "";
      break;
  }

  return (
    <div>
      <label className="block mb-2">{questionText}</label>
      <textarea
        {...register("careBackground")}
        className="w-full p-2 mb-4 border rounded h-36"
      ></textarea>
      {exampleText && <p className="text-sm text-gray-600">{exampleText}</p>}
    </div>
  );
};
