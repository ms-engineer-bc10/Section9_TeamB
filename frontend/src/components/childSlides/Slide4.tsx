import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide4Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide4 = ({ register }: Slide4Props) => (
  <div>
    <label className="block mb-2">
      お子さまの好きなもの・ことを教えてください。
    </label>
    <p className="text-sm text-gray-600">例： 恐竜、電車、おままごと、ねこ</p>
    <p className="text-sm text-gray-600">
      　　もしかすると、絵本の中に登場するかもしれません！
    </p>
    <textarea
      {...register("interests")}
      className="w-full p-2 mb-4 border rounded h-36"
    ></textarea>
  </div>
);
