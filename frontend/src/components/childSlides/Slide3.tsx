import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide3Props {
  register: UseFormRegister<ChildFormData>;
  errors: FieldErrors<ChildFormData>;
}

export const Slide3 = ({ register, errors }: Slide3Props) => (
  <div>
    <label className="block mb-2">
      お子さまからどのように呼ばれていますか？
    </label>
    <label className="text-sm text-gray-600">
      例：パパ、おとうさん、ダディ
    </label>
    <input
      {...register("fatherTitle")}
      type="text"
      className="w-full p-2 mb-4 border rounded"
    />
    {errors.fatherTitle && (
      <p className="text-red-500 text-sm mb-4">{errors.fatherTitle.message}</p>
    )}
    <label className="text-sm text-gray-600">
      例：ママ、おかあさん、マミー
    </label>
    <input
      {...register("motherTitle")}
      type="text"
      className="w-full p-2 mb-4 border rounded"
    />
    {errors.motherTitle && (
      <p className="text-red-500 text-sm mb-4">{errors.motherTitle.message}</p>
    )}
  </div>
);
