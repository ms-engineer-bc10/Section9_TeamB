import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide6Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide6 = ({ register }: Slide6Props) => (
  <div>
    <label className="block mb-2">
      お子さまを育てられなかった背景を教えてください
    </label>
    <textarea
      {...register("originBackground")}
      className="w-full p-2 mb-4 border rounded h-36"
    ></textarea>
  </div>
);
