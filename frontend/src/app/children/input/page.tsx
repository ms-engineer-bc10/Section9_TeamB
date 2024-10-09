"use client";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { nextStep, prevStep, goToSlide } from "@/utils/swiperControls";
import { ChildFormData, genderMap, backgroundTypeMap } from "@/types";
import { auth } from "@/lib/firebase";
import { createChild, createBook } from "@/lib/api";
import { Slide1 } from "@/components/childSlides/Slide1";
import { Slide2 } from "@/components/childSlides/Slide2";
import { Slide3 } from "@/components/childSlides/Slide3";
import { Slide4 } from "@/components/childSlides/Slide4";
import { Slide5 } from "@/components/childSlides/Slide5";
import { Slide6 } from "@/components/childSlides/Slide6";
import { Slide7 } from "@/components/childSlides/Slide7";

const TOTAL_STEPS = 8;

const ChildInfoForm = () => {
  const { register, handleSubmit, watch } = useForm<ChildFormData>({
    defaultValues: { gender: "no_answer" },
  });
  const [step, setStep] = useState(1); // 現在のステップ
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const selectedBackgroundType = watch("backgroundType");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ChildFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error("ユーザーがログインしていません");
        return;
      }

      const token = await currentUser.getIdToken(true);

      const postData = {
        name: data.name,
        birth_date: data.birthDate,
        arrival_date: data.arrivalDate || null,
        gender: genderMap[data.gender] || "no_answer",
        interests: data.interests,
        background_type: backgroundTypeMap[data.backgroundType] || null,
        background_other: data.backgroundOther || null,
        origin_background: data.originBackground || null,
        care_background: data.careBackground || null,
        family_structure: data.familyStructure || null,
        father_title: data.fatherTitle || null,
        mother_title: data.motherTitle || null,
      };

      // 子供情報の送信
      const childData = await createChild(token, postData);

      // 絵本生成リクエスト
      await createBook(token, childData.id);

      // 正常に処理が完了した場合、ホームページにリダイレクト
      router.push("/home");
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
      setError(
        error instanceof Error ? error.message : "予期せぬエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* 進捗ドット */}
      <div className="flex justify-center mb-4">
        {[...Array(TOTAL_STEPS)].map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(swiperRef, index, setStep)} // ドットをクリックで該当スライドへ移動
            className={`cursor-pointer w-3 h-3 rounded-full mx-1 ${
              index + 1 === step ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-md bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            allowTouchMove={false}
            onSlideChange={(swiper) => setStep(swiper.activeIndex + 1)}
          >
            <SwiperSlide>
              <Slide1 register={register} />
            </SwiperSlide>

            <SwiperSlide>
              <Slide2 register={register} />
            </SwiperSlide>

            <SwiperSlide>
              <Slide3 register={register} />
            </SwiperSlide>

            <SwiperSlide>
              <Slide4 register={register} />
            </SwiperSlide>

            <SwiperSlide>
              <Slide5
                register={register}
                selectedBackgroundType={selectedBackgroundType}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide6
                register={register}
                selectedBackgroundType={selectedBackgroundType}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide7
                register={register}
                selectedBackgroundType={selectedBackgroundType}
              />
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <div className="p-8">
                  <p className="p-2">ご回答ありがとうございます。</p>
                  <p className="p-2">素敵な絵本を作りましょう✨</p>
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-orange-500 text-white rounded h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "処理中..." : "完了"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </SwiperSlide>
          </Swiper>
        </form>

        <div className="mt-4 flex justify-between w-full max-w-md h-12">
          <button
            type="button"
            onClick={() => prevStep(swiperRef, step, setStep)}
            disabled={step === 1 || isLoading}
            className={`px-6 p-2 rounded h-full ${
              step === 1 ? "invisible" : "bg-gray-300 text-gray-800"
            }`}
          >
            戻る
          </button>
          {step < TOTAL_STEPS && (
            <button
              type="button"
              onClick={() => nextStep(swiperRef, step, setStep)}
              disabled={isLoading}
              className="px-6 p-2 bg-orange-500 text-white rounded h-full"
            >
              次へ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildInfoForm;
