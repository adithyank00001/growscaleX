import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 130,
            height: 130,
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "100%",
              height: 32,
              background: "#2F6DF2",
              transform: "translateY(-50%) rotate(-45deg)",
              borderRadius: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "70%",
              height: 32,
              background: "#0B0B0F",
              transform: "translateY(-50%) rotate(45deg)",
              borderRadius: 10,
              opacity: 0.95,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}

