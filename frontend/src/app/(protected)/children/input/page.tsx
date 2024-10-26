"use client";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { nextStep, prevStep, goToSlide } from "@/utils/swiperControls";
import { ChildFormData, genderMap, backgroundTypeMap } from "@/types";
import { createChild, createBook } from "@/lib/api";
import { Slide1 } from "@/components/childSlides/Slide1";
import { Slide2 } from "@/components/childSlides/Slide2";
import { Slide3 } from "@/components/childSlides/Slide3";
import { Slide4 } from "@/components/childSlides/Slide4";
import { Slide5 } from "@/components/childSlides/Slide5";
import { Slide6 } from "@/components/childSlides/Slide6";
import { Slide7 } from "@/components/childSlides/Slide7";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft, ChevronRight, Home, Send, Sparkles } from "lucide-react";

const TOTAL_STEPS = 8;

const ChildInfoForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChildFormData>({
    defaultValues: { gender: "no_answer" },
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const selectedBackgroundType = watch("backgroundType");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useAuth();

  const onSubmit = async (data: ChildFormData) => {
    setIsLoading(true);
    setServerError(null);
    setMessage(null);

    try {
      if (!user) {
        console.error("ユーザーがログインしていません");
        return;
      }

      const token = await user.getIdToken(true);

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

      setMessage("絵本を生成中です。完了しましたらメールでお知らせします。");

      // 5秒後にホームページにリダイレクト
      setTimeout(() => {
        router.push("/home");
      }, 5000);
    } catch (error) {
      console.error("APIリクエスト中にエラーが発生しました:", error);
      setServerError(
        error instanceof Error ? error.message : "予期せぬエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (!isValid()) return;
    nextStep(swiperRef, step, setStep);
  };

  const isValid = () => {
    let isValid = true;

    if (step == 1) {
      /* step1の時のバリデーション */
      // nameのバリデーション
      if (watch().name === "") {
        setError("name", { message: "名前は必須です" });
        isValid = false;
      } else if (
        /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watch().name)
      ) {
        setError("name", {
          message: "アルファベット・記号を入れることができません",
        });
        isValid = false;
      } else {
        clearErrors("name");
      }
      // birthDateのバリデーション
      if (watch().birthDate === "") {
        setError("birthDate", { message: "お誕生日は必須です" });
        isValid = false;
      } else if (new Date(watch().birthDate) >= new Date()) {
        setError("birthDate", { message: "今日以前の日付にしてください" });
        isValid = false;
      } else {
        clearErrors("birthDate");
      }
    } else if (step == 2) {
      /* step2の時のバリデーション */
      // familyStructureのバリデーション
      if (watch().familyStructure === "") {
        setError("familyStructure", { message: "家族構成は必須です" });
        isValid = false;
      } else if (
        /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
          watch().familyStructure
        )
      ) {
        setError("familyStructure", {
          message: "アルファベット・記号を入れることができません",
        });
        isValid = false;
      } else {
        clearErrors("familyStructure");
      }
    } else if (step == 3) {
      /* step3の時のバリデーション */
      // fatherTitleのバリデーション
      if (watch().fatherTitle === "") {
        setError("fatherTitle", { message: "必須項目です" });
        isValid = false;
      } else if (
        /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watch().fatherTitle)
      ) {
        setError("fatherTitle", {
          message: "アルファベット・記号を入れることができません",
        });
        isValid = false;
      } else {
        clearErrors("fatherTitle");
      }
      // fatherTitleのバリデーション
      if (watch().motherTitle === "") {
        setError("motherTitle", { message: "必須項目です" });
        isValid = false;
      } else if (
        /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(watch().motherTitle)
      ) {
        setError("motherTitle", {
          message: "アルファベット・記号を入れることができません",
        });
        isValid = false;
      } else {
        clearErrors("motherTitle");
      }
    } else if (step == 4) {
      /* step4の時のバリデーション */
      // interestsのバリデーション
      if (watch().interests === "") {
        setError("interests", { message: "必須項目です" });
        isValid = false;
      } else {
        clearErrors("interests");
      }
    } else if (step == 5) {
      /* step5の時のバリデーション */
      // backgroundTypeのバリデーション
      if (watch().backgroundType === undefined) {
        setError("backgroundType", { message: "必須項目です" });
        isValid = false;
      } else {
        clearErrors("backgroundType");
      }
      // arrivalDateのバリデーション
      if (watch().arrivalDate === "") {
        setError("arrivalDate", { message: "必須項目です" });
        isValid = false;
      } else {
        clearErrors("arrivalDate");
      }
    } else if (step == 6) {
      /* step6の時のバリデーション */
      // originBackgroundのバリデーション
      if (watch().originBackground === "") {
        setError("originBackground", { message: "必須項目です" });
        isValid = false;
      } else {
        clearErrors("originBackground");
      }
    } else if (step == 7) {
      /* step7の時のバリデーション */
      // careBackgroundのバリデーション
      if (watch().careBackground === "") {
        setError("careBackground", { message: "必須項目です" });
        isValid = false;
      } else {
        clearErrors("careBackground");
      }
    }
    return isValid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 to-orange-100 py-8 px-4 relative overflow-hidden">
      {/* 背景の装飾 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-50 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full opacity-30 animate-float"></div>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 font-comic">
          お子さま情報入力
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* 進捗ドット */}
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
                <Slide1 register={register} errors={errors} />
              </SwiperSlide>
              <SwiperSlide>
                <Slide2 register={register} errors={errors} />
              </SwiperSlide>
              <SwiperSlide>
                <Slide3 register={register} errors={errors} />
              </SwiperSlide>
              <SwiperSlide>
                <Slide4 register={register} errors={errors} />
              </SwiperSlide>
              <SwiperSlide>
                <Slide5
                  register={register}
                  selectedBackgroundType={selectedBackgroundType}
                  errors={errors}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Slide6
                  register={register}
                  selectedBackgroundType={selectedBackgroundType}
                  errors={errors}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Slide7
                  register={register}
                  selectedBackgroundType={selectedBackgroundType}
                  errors={errors}
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
                  {serverError && (
                    <p className="text-red-500 mt-2 font-comic">
                      {serverError}
                    </p>
                  )}
                  {message && (
                    <p className="text-green-500 mt-2 font-comic">{message}</p>
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
                  onClick={handleNext}
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
                "入力した内容は破棄されます。ホームに戻りますか？"
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
