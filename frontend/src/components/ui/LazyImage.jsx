import { useEffect, useRef, useState } from "react";

const loadedImageCache = new Set();

const LazyImage = ({
  src,
  alt,
  wrapperClassName = "",
  className = "",
  priority = false,
  skeletonClassName = "",
  ...props
}) => {
  const imageRef = useRef(null);
  const [loaded, setLoaded] = useState(() => loadedImageCache.has(src));

  useEffect(() => {
    setLoaded(loadedImageCache.has(src));
  }, [src]);

  useEffect(() => {
    if (imageRef.current?.complete) {
      loadedImageCache.add(src);
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded ? (
        <div
          className={`absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 ${skeletonClassName}`}
        />
      ) : null}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => {
          loadedImageCache.add(src);
          setLoaded(true);
        }}
        onError={() => setLoaded(true)}
        className={`transition-[transform,opacity] duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
