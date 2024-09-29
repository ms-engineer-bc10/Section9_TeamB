import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide4Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide4 = ({ register }: Slide4Props) => (
  <div>
    <label className="block mb-2">お子さまの好きなものを教えてください</label>
    <textarea
      {...register("interests")}
      className="w-full p-2 mb-4 border rounded h-36"
    ></textarea>
  </div>
);
