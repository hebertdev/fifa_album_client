import { forwardRef } from "react";

const AlbumClosing = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div
        style={{
          background: "#960b2a",
          width: "100%",
          height: "100%",
          boxShadow:
            "inset 0 0 30px 0 rgb(36 10 3 / 50%), 10px 0 8px 0 rgb(0 0 0 / 40%)",
        }}
      ></div>
    </div>
  );
});

AlbumClosing.displayName = "AlbumClosing";
export default AlbumClosing;
