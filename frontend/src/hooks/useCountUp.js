import { useEffect, useState } from "react";

export const useCountUp = (target, startAnimation, duration = 1200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const totalFrames = Math.max(Math.round(duration / 16), 1);
    const increment = target / totalFrames;

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(target % 1 === 0 ? Math.floor(start) : Number(start.toFixed(1)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [duration, startAnimation, target]);

  return count;
};
