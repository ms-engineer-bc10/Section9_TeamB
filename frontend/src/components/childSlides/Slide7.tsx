import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";
import { backgroundLabels } from "@/lib/backgroundLabels"; // backgroundLabelsをインポート

interface Slide7Props {
  register: UseFormRegister<ChildFormData>;
  selectedBackgroundType: string;
}

export const Slide7 = ({ register, selectedBackgroundType }: Slide7Props) => {
  const selectedLabels = backgroundLabels[selectedBackgroundType] || {
    careLabel: "ご家族になった背景を教えてください",
    careExample: "",
  };

  return (
    <div>
      <label className="block mb-2">{selectedLabels.careLabel}</label>
      <textarea
        {...register("careBackground")}
        className="w-full p-2 mb-4 border rounded h-36"
      ></textarea>
      {selectedLabels.careExample && (
        <p className="text-sm text-gray-600">{selectedLabels.careExample}</p>
      )}
    </div>
  );
};
