export const nextStep = (
  swiperRef: any,
  step: number,
  setStep: (step: number) => void
) => {
  if (swiperRef.current) {
    swiperRef.current.swiper.slideNext();
    setStep(step + 1);
  }
};

export const prevStep = (
  swiperRef: any,
  step: number,
  setStep: (step: number) => void
) => {
  if (swiperRef.current) {
    swiperRef.current.swiper.slidePrev();
    setStep(step - 1);
  }
};

export const goToSlide = (
  swiperRef: any,
  index: number,
  setStep: (step: number) => void
) => {
  if (swiperRef.current) {
    swiperRef.current.swiper.slideTo(index);
    setStep(index + 1);
  }
};
