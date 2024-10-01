import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide6Props {
  register: UseFormRegister<ChildFormData>;
  selectedBackgroundType: string;
}

export const Slide6 = ({ register, selectedBackgroundType }: Slide6Props) => {
  let questionText = "お子さまを育てられなかった背景を教えてください";
  let exampleText = "";

  switch (selectedBackgroundType) {
    case "special_adoption":
      questionText =
        "お子さまが元のご家族で育てられなかった背景について、可能な範囲でお聞かせください。";
      exampleText =
        "例: この子を産んだご両親は、当時非常に若く、経済的にも精神的にも子育てが難しい状況でした。そのため、私たちは養子縁組を通じてお迎えすることになりました。";
      break;
    case "foster_regular_adoption":
      questionText =
        "お子さまが元のご家族で育てられなかった理由についてお聞かせください。";
      exampleText =
        "例: この子を産んだご両親は、家庭の事情で長期的に子育てができなくなり、私たちが里親としてこの子を迎え入れることになりました。";
      break;
    case "sperm_donation":
      questionText =
        "精子提供に至った背景について、どのような経緯があったのかお聞かせください。";
      exampleText =
        "例: 私たちは長年不妊治療を続けてきましたが、自然妊娠が難しいという診断を受け、精子提供という選択肢を検討しました。最終的に、その方法で家族を迎え入れることを決めました。";
      break;
    case "egg_donation":
      questionText =
        "卵子提供に至った背景について、どのような経緯があったのかお聞かせください。";
      exampleText =
        "例: 体質的に自分の卵子で妊娠することが難しいと分かり、卵子提供を受けることにしました。たくさんの悩みと考慮を重ねた結果、この方法で家族を作る決断をしました。";
      break;
    case "step_family":
      questionText =
        "ご家族がステップファミリーになった背景や、お子さまとの関係がどのように形作られたのか教えてください。";
      exampleText =
        "例: 私とパートナーが再婚し、ステップファミリーとしての新しい生活が始まりました。最初は戸惑いもありましたが、お互いを理解し合いながら少しずつ絆を深めていきました。";
      break;
    case "other":
      questionText =
        "お子さまが元のご家族で育てられなかった背景について、またご家族となるまでの特別な経緯について教えてください。";
      exampleText =
        "例: お子さまが育てられなかった理由は複雑ですが、様々な事情が重なり、私たちが家族としてお迎えすることになりました。その過程で、たくさんの困難と向き合いましたが、今では新しい家族として幸せな日々を過ごしています。";
      break;
    default:
      questionText = "お子さまを育てられなかった背景を教えてください";
      exampleText = "";
      break;
  }

  return (
    <div>
      <label className="block mb-2">{questionText}</label>
      <textarea
        {...register("originBackground")}
        className="w-full p-2 mb-4 border rounded h-36"
      ></textarea>
      {exampleText && <p className="text-sm text-gray-600">{exampleText}</p>}
    </div>
  );
};
