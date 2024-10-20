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
        "ご家族が特別養子縁組を選んだ経緯や、お子さまが家族の一員になった経緯や現在のお気持ちについて教えてください。";
      exampleText =
        "例: 私たちは長い間子どもを望んでおり不妊治療も経験しましたが、年齢的にも厳しいことから、研修を受けて養親に登録しました。この子を受け入れてほしいと連絡があった日の喜びと興奮は忘れられません。初めての育児に戸惑うこともありますが、毎日が幸せです。";
      break;
    case "foster_regular_adoption":
      questionText =
        "里子・養子縁組を通じてどのようにしてご家族になられたのか、その過程を教えてください。";
      exampleText =
        "例: 私たちは里親登録をして数年後、この子と出会いました。最初は短期間の里親の予定でしたが、1年以上一緒に生活することで大きくなるまで成長を見守りたいと思っています。";
      break;
    case "sperm_donation":
      questionText =
        "精子提供を経て、どのようにしてご家族が一緒に歩み始めたのか、その過程について教えてください。";
      exampleText =
        "例: 出自を知る権利について懸念していましたが、非匿名のドナーに協力してもらうことができ、体外受精を経て無事に妊娠、この子が誕生しました。家族全員で一歩一歩、新しい生活に順応しながら、愛情を育んでいます。";
      break;
    case "egg_donation":
      questionText =
        "卵子提供を経て、どのようにしてご家族が一緒に歩み始めたのか、その過程について教えてください。";
      exampleText =
        "例: 海外での卵子提供で不安もありましたが、卵子ドナーのおかげで無事に妊娠し、この子が誕生しました。妊娠中から「我が子」という思いが強かったので、普段は卵子提供ということもあまり意識せず、新しい生活を楽しんでいます。";
      break;
    case "step_family":
      questionText =
        "ステップファミリーとしての新しい家族の形ができるまでの過程について、お教えいただけますか？";
      exampleText =
        "例: 最初はぎこちない部分もありましたが、家族全員で時間をかけて互いの存在に慣れ、家族としての一体感が少しずつ出てきました。今では、笑顔と愛情にあふれた毎日を過ごしています。";
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
