import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide3Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide3 = ({ register }: Slide3Props) => (
  <div>
    <label className="block mb-2">お子さまからどのように呼ばれていますか</label>
    <label>例：ぱぱ、おとうさん</label>
    <input
      {...register("fatherTitle")}
      type="text"
      className="w-full p-2 mb-4 border rounded"
    />
    <label>例：まま、おかあさん</label>
    <input
      {...register("motherTitle")}
      type="text"
      className="w-full p-2 mb-4 border rounded"
    />
  </div>
);
