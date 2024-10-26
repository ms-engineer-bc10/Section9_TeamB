import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide2Props {
  register: UseFormRegister<ChildFormData>;
  errors: FieldErrors<ChildFormData>;
}

export const Slide2 = ({ register, errors }: Slide2Props) => (
  <div>
    <label>ご家族構成を教えてください</label>
    <input
      type="text"
      {...register("familyStructure")}
      placeholder="父、母、りんちゃん"
      className="w-full p-2 mb-4 border rounded"
    />
    {errors.familyStructure && (
      <p className="text-red-500 text-sm mb-4">
        {errors.familyStructure.message}
      </p>
    )}
  </div>
);
