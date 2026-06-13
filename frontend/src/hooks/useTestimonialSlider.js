import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const getCardsPerView = (width) => {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
};

export const useTestimonialSlider = (totalItems) => {
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const touchStartX = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(totalItems - cardsPerView, 0);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const measureSlideWidth = useCallback(() => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      const firstSlide = trackRef.current.firstElementChild;
      setSlideWidth(firstSlide.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(measureSlideWidth, 100);
    window.addEventListener("resize", measureSlideWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureSlideWidth);
    };
  }, [cardsPerView, measureSlideWidth]);

  useEffect(() => {
    if (maxIndex === 0) return undefined;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? prev : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const handlePrev = () => setIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev >= maxIndex ? maxIndex : prev + 1));

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;

    const deltaX = touchStartX.current - event.changedTouches[0].clientX;
    if (deltaX > 50) handleNext();
    if (deltaX < -50) handlePrev();
    touchStartX.current = null;
  };

  const translateX = -(index * slideWidth);

  return {
    index,
    setIndex,
    cardsPerView,
    pages: useMemo(
      () => Array.from({ length: maxIndex + 1 }, (_, pageIndex) => pageIndex),
      [maxIndex]
    ),
    handlePrev,
    handleNext,
    handleTouchStart,
    handleTouchEnd,
    containerRef,
    trackRef,
    translateX,
  };
};
