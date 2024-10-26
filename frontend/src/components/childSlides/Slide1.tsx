import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types/index";

interface Slide1Props {
  register: UseFormRegister<ChildFormData>;
  errors: FieldErrors<ChildFormData>;
}

export const Slide1 = ({ register, errors }: Slide1Props) => {
  return (
    <div>
      <label className="block mb-2">
        お子さまのおなまえ/ニックネーム
        <span className="text-red-500 text-sm ml-1">*</span>
      </label>
      <input
        type="text"
        {...register("name", { required: true })}
        placeholder="りんちゃん、あおくん"
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>
      )}
      <label className="block mb-2">
        お誕生日
        <span className="text-red-500 text-sm ml-1">*</span>
      </label>
      <input
        type="date"
        {...register("birthDate", { required: true })}
        className="w-full p-2 mb-4 border rounded"
      />
      {errors.birthDate && (
        <p className="text-red-500 text-sm mb-4">{errors.birthDate.message}</p>
      )}
      <label className="block mb-2">
        性別
        <span className="text-red-500 text-sm ml-1">*</span>
      </label>
      <div className="flex items-center space-x-4 mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="boy"
            {...register("gender", { required: true })}
            className="form-radio appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-orange-500 checked:border-transparent focus:outline-none"
          />
          <span className="ml-2">男の子</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="girl"
            {...register("gender", { required: true })}
            className="form-radio appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-orange-500 checked:border-transparent focus:outline-none"
          />
          <span className="ml-2">女の子</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="no_answer"
            {...register("gender", { required: true })}
            className="form-radio appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-orange-500 checked:border-transparent focus:outline-none"
            defaultChecked
          />
          <span className="ml-2">答えたくない</span>
        </label>
      </div>
      {errors.gender && (
        <p className="text-red-500 text-sm mb-4">{errors.gender.message}</p>
      )}
    </div>
  );
};
