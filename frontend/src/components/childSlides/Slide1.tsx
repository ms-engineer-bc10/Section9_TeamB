import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide1Props {
  register: UseFormRegister<ChildFormData>;
}

export const Slide1 = ({ register }: Slide1Props) => (
  <div>
    <label className="block mb-2">お子さまのおなまえ/ニックネーム</label>
    <input
      type="text"
      {...register("name")}
      className="w-full p-2 mb-4 border rounded"
    />
    <label className="block mb-2">お誕生日</label>
    <input
      type="date"
      {...register("birthDate")}
      className="w-full p-2 mb-4 border rounded"
    />
    <label className="block mb-2">性別</label>
    <div className="flex items-center space-x-4 mb-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          value="boy"
          {...register("gender")}
          className="form-radio"
        />
        <span className="ml-2">男の子</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          value="girl"
          {...register("gender")}
          className="form-radio"
        />
        <span className="ml-2">女の子</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          value="no_answer"
          {...register("gender")}
          className="form-radio"
          defaultChecked
        />
        <span className="ml-2">答えたくない</span>
      </label>
    </div>
  </div>
);
