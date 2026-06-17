"use client";

import React, { useEffect } from "react";

export default function BookPage() {
  useEffect(() => {
    document.title = "Error 502 (Server Error)!!1";
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        color: "#222",
        zIndex: 9999999,
        fontFamily: "arial, sans-serif",
        padding: "15px",
        overflow: "auto"
      }}
    >
      <div
        style={{
          margin: "7% auto 0",
          maxWidth: "390px",
          minHeight: "180px",
          padding: "30px 0 15px",
          paddingRight: "205px",
          background: "url(https://www.google.com/images/errors/robot.png) 100% 5px no-repeat",
          position: "relative"
        }}
        className="google-error-container"
      >
        <a href="/">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png"
            alt="Google"
            style={{ border: 0, marginLeft: "-5px", height: "54px", width: "150px", display: "inline-block" }}
          />
        </a>
        <p style={{ margin: "11px 0 22px", overflow: "hidden", fontSize: "15px", lineHeight: "22px" }}>
          <b style={{ fontWeight: "bold" }}>502.</b>{" "}
          <ins style={{ color: "#777", textDecoration: "none" }}>That's an error.</ins>
        </p>
        <p style={{ margin: "11px 0 22px", overflow: "hidden", fontSize: "15px", lineHeight: "22px" }}>
          The server encountered a temporary error and could not complete your request.
        </p>
        <p style={{ margin: "11px 0 22px", overflow: "hidden", fontSize: "15px", lineHeight: "22px" }}>
          Please try again in 30 seconds.{" "}
          <ins style={{ color: "#777", textDecoration: "none" }}>That's all we know.</ins>
        </p>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media screen and (max-width: 772px) {
          .google-error-container {
            background: none !important;
            margin-top: 0 !important;
            max-width: none !important;
            padding-right: 0 !important;
          }
        }
      `}} />
    </div>
  );
}
