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
import { useRedirectIfNotAuthenticated } from "@/lib/auth";
import { ChevronLeft, ChevronRight, Home, Send, Sparkles } from "lucide-react";

const TOTAL_STEPS = 8;

const ChildInfoForm = () => {
  const { register, handleSubmit, watch } = useForm<ChildFormData>({
    defaultValues: { gender: "no_answer" },
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const selectedBackgroundType = watch("backgroundType");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useRedirectIfNotAuthenticated();

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
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          お子さま情報入力
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-center mb-6">
            {Array.from({ length: TOTAL_STEPS }, (_, index) => (
              <div
                key={index}
                onClick={() => goToSlide(swiperRef, index, setStep)}
                className={`cursor-pointer w-4 h-4 rounded-full mx-1 transition-all duration-300 ${
                  index + 1 === step
                    ? "bg-orange-500 scale-125"
                    : "bg-orange-200 hover:bg-orange-300"
                }`}
              ></div>
            ))}
          </div>
          <div className="mt-8">
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
                <div className="text-center">
                  <p className="text-xl font-comic mb-8">
                    ご回答ありがとうございます。
                  </p>
                  <div className="text-lg font-comic mb-8 inline-flex items-center justify-center">
                    素敵な絵本を作りましょう
                    <Sparkles className="ml-1 text-yellow-600" size={20} />
                  </div>
                  <button
                    type="submit"
                    className="w-auto px-6 p-3 bg-orange-500 text-white rounded-full font-bold font-comic text-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center mx-auto"
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">🔄</span>
                        処理中...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        完了
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="text-red-500 mt-2 font-comic">{error}</p>
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => prevStep(swiperRef, step, setStep)}
                disabled={step === 1 || isLoading}
                className={`px-6 py-3 rounded-full font-comic text-lg transition-all duration-300 flex items-center ${
                  step === 1
                    ? "opacity-0 cursor-default"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
              >
                <ChevronLeft className="mr-1" size={20} />
                戻る
              </button>
              {step < TOTAL_STEPS && (
                <button
                  type="button"
                  onClick={() => nextStep(swiperRef, step, setStep)}
                  disabled={isLoading}
                  className="px-6 py-3 bg-orange-500 text-white rounded-full font-bold font-comic text-lg hover:bg-orange-600 transition-colors duration-300 flex items-center"
                >
                  次へ
                  <ChevronRight className="ml-1" size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const confirmLeave = window.confirm(
                "入力した内容は破棻されます。ホームに戻りますか？"
              );
              if (confirmLeave) {
                router.push("/home");
              }
            }}
            className="bg-white text-orange-600 px-6 py-3 rounded-full hover:bg-orange-100 focus:outline-none shadow-md transition-all transform hover:scale-105 font-comic text-lg inline-flex items-center"
          >
            <Home className="mr-2" size={20} />
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildInfoForm;
