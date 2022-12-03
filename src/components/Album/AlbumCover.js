//components
import ImageLoad from "components/ImageLoad";

import { forwardRef } from "react";
import cover from "assets/cover_album-min.jpg";
import cover_min from "assets/cover_album-min.jpg";

const AlbumCover = forwardRef((props, ref) => {
  //"inset 0 0 30px 0 rgb(36 10 3 / 50%), 10px 0 8px 0 rgb(0 0 0 / 40%)",  BACKDOR
  return (
    <div ref={ref}>
      <div
        style={{
          background: "#8d0930",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          boxShadow:
            "inset 0 0 30px 0 rgb(36 10 3 / 50%), -2px 0 5px 2px rgb(0 0 0 / 40%)",
          position: "relative",
        }}
      >
        <ImageLoad
          src={cover.src}
          placeholder={cover_min.src}
          extraStyles={{
            width: "100%",
            top: "0",
            left: "0",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
});

AlbumCover.displayName = "CoverAlbum";
export default AlbumCover;
