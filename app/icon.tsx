import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* Simple GrowScaleX mark (blue/black X) */}
        <div
          style={{
            position: "relative",
            width: 360,
            height: 360,
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "100%",
              height: 90,
              background: "#2F6DF2",
              transform: "translateY(-50%) rotate(-45deg)",
              borderRadius: 14,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "70%",
              height: 90,
              background: "#0B0B0F",
              transform: "translateY(-50%) rotate(45deg)",
              borderRadius: 14,
              opacity: 0.95,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}

