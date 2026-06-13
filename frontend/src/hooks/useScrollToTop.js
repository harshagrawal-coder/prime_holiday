import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(elementId);

      if (target) {
        target.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
        return;
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [hash, pathname]);
};

export default useScrollToTop;
