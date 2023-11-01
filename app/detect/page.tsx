"use client";

import { useEffect, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import { BoundingBox } from "./boundingBox";
import { drawCircles } from "./drawCircles";

export default function Detect() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState<string>();

  const getRectangles = async (dataURL: string) => {
    const blobResponse = await fetch(dataURL);
    const blob = await blobResponse.blob();

    const jsonResponse = await fetch(
      "https://backend.happiness-finder.com/api/detect",
      {
        method: "POST",
        headers: {
          "Content-Type": blob.type,
        },
        body: blob,
      }
    );
    const data: BoundingBox[] = await jsonResponse.json();

    return data;
  };

  const captureFrame = async () => {
    if (videoRef.current?.srcObject == null) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.height = 640;
    canvas.width = 480;

    const ctx = canvas.getContext("2d");

    if (ctx == null) {
      return;
    }

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    try {
      const rectangles = await getRectangles(
        canvas.toDataURL("image/jpeg", 0.35)
      );
      await drawCircles(ctx, rectangles);
      setImage(canvas.toDataURL());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: { exact: "environment" },
        },
      })
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;

          videoRef.current.setAttribute("muted", "");
          videoRef.current.setAttribute("playsinline", "");

          videoRef.current.addEventListener("loadeddata", () => {
            videoRef.current?.play();
          });
        }
      });

    const intervalID = setInterval(captureFrame, 200);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Div100vh
      style={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <video ref={videoRef} hidden></video>
      {image && (
        <img
          src={image}
          style={{
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      )}
    </Div100vh>
  );
}
