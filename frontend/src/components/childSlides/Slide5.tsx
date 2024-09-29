import { UseFormRegister } from "react-hook-form";
import { ChildFormData } from "@/types";

interface Slide5Props {
  register: UseFormRegister<ChildFormData>;
  selectedBackgroundType: string;
}

export const Slide5 = ({ register, selectedBackgroundType }: Slide5Props) => {
  return (
    <div>
      <label className="block mb-2">どのような経緯でご家族になりましたか</label>
      <select
        {...register("backgroundType")}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="special_adoption">特別養子縁組</option>
        <option value="foster_regular_adoption">里子・普通養子縁組</option>
        <option value="sperm_donation">精子提供</option>
        <option value="egg_donation">卵子提供</option>
        <option value="step_family">ステップファミリー</option>
        <option value="other">その他</option>
      </select>

      {selectedBackgroundType === "other" && (
        <div>
          <label className="block mb-2">その他の背景を教えてください</label>
          <input
            {...register("backgroundOther")}
            type="text"
            className="w-full p-2 mb-4 border rounded"
          />
        </div>
      )}

      {selectedBackgroundType !== "sperm_donation" &&
        selectedBackgroundType !== "egg_donation" && (
          <div>
            <label className="block mb-2">
              お子さまを迎えた日を教えてください
            </label>
            <input
              {...register("arrivalDate")}
              type="date"
              className="w-full p-2 mb-4 border rounded"
            />
          </div>
        )}
    </div>
  );
};
