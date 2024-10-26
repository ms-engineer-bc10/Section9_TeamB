import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";
import { backgroundLabels } from "@/lib/backgroundLabels";

interface Slide6Props {
  register: UseFormRegister<ChildFormData>;
  errors: FieldErrors<ChildFormData>;
  selectedBackgroundType: string;
}

export const Slide6 = ({
  register,
  errors,
  selectedBackgroundType,
}: Slide6Props) => {
  const selectedLabels = backgroundLabels[selectedBackgroundType] || {
    originLabel: "お子さまを育てられなかった背景を教えてください",
    originExample: "",
  };

  return (
    <div>
      <label className="block mb-2">{selectedLabels.originLabel}</label>
      <textarea
        {...register("originBackground")}
        className="w-full p-2 mb-4 border rounded h-36"
      ></textarea>
      {errors.originBackground && (
        <p className="text-red-500 text-sm mb-4">
          {errors.originBackground.message}
        </p>
      )}
      {selectedLabels.originExample && (
        <p className="text-sm text-gray-600">{selectedLabels.originExample}</p>
      )}
    </div>
  );
};
