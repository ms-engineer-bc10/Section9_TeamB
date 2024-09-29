import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide7Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide7 = ({ register }: Slide7Props) => (
  <div>
    <label>ご家族になった背景を教えてください</label>
    <textarea
      {...register("careBackground")}
      className="w-full p-2 mb-4 border rounded h-36"
    ></textarea>
  </div>
);
