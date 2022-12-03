import React, { useState, useEffect } from "react";

const ImageLoad = React.memo(({ src, placeholder, alt = "", extraStyles }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(placeholder);

  useEffect(() => {
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      // When image is loaded replace the src and set loading to false
      setLoading(false);
      updateSrc(src);
    };
  }, [src]);

  return (
    <picture>
      <img
        src={currentSrc}
        style={{
          opacity: loading ? 0.5 : 1,
          transition: "opacity .15s linear",
          ...extraStyles,
        }}
        alt={alt}
      />
    </picture>
  );
});

ImageLoad.displayName = "ImageLoad";
export default ImageLoad;
