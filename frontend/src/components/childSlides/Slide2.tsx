import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide2Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide2 = ({ register }: Slide2Props) => (
  <div>
    <label>ご家族構成を教えてください</label>
    <input
      type="text"
      {...register("familyStructure")}
      className="w-full p-2 mb-4 border rounded"
    />
  </div>
);
