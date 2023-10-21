"use client";

import { useEffect, useRef, useState } from "react";
import Div100vh from "react-div-100vh";

export default function Detect() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState<string>();

  const drawRectangles = async (img: string) => {
    return img;
  };

  const captureFrame = async () => {
    if (videoRef.current?.srcObject == null) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.height = videoRef.current.videoHeight;
    canvas.width = videoRef.current.videoWidth;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);

    const dataURL = canvas.toDataURL();
    try {
      const img = await drawRectangles(dataURL);
      setImage(img);
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
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </Div100vh>
  );
}
