"use client";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { ChildFormData } from "@/types";
import { handleFormSubmit } from "@/utils/handleFormSubmit";
import { Slide1 } from "@/components/childSlides/Slide1";
import { Slide2 } from "@/components/childSlides/Slide2";
import { Slide3 } from "@/components/childSlides/Slide3";
import { Slide4 } from "@/components/childSlides/Slide4";
import { Slide5 } from "@/components/childSlides/Slide5";
import { Slide6 } from "@/components/childSlides/Slide6";
import { Slide7 } from "@/components/childSlides/Slide7";

const ChildInfoForm = () => {
  const { register, handleSubmit, watch } = useForm<ChildFormData>({
    defaultValues: { gender: "no_answer" },
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const selectedBackgroundType = watch("backgroundType");

  const onSubmit = async (data: ChildFormData) => {
    await handleFormSubmit(data, router);
  };

  const nextStep = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Swiper ref={swiperRef} slidesPerView={1} allowTouchMove={false}>
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
                  className="w-full p-2 bg-blue-500 text-white rounded h-12"
                >
                  完了
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </form>

        <div className="mt-4 flex justify-between w-full max-w-md h-12">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`p-2 rounded h-full ${
              step === 1 ? "invisible" : "bg-gray-300 text-gray-800"
            }`}
          >
            戻る
          </button>
          {step < 8 && (
            <button
              type="button"
              onClick={nextStep}
              className="p-2 bg-blue-500 text-white rounded h-full"
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
