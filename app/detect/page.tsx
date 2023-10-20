"use client";

import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";

export default function Detect() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState<string>();

  const drawRectangles = async (img: string) => {
    return img;
  };

  const captureFrame = async () => {
    if (videoRef.current == null) {
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
        video: true,
      })
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      });

    const intervalID = setInterval(captureFrame, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Stack
      justifyContent="center"
      sx={{
        bgcolor: "#F2F2F2",
        height: "100vh",
      }}
    >
      <video ref={videoRef} autoPlay hidden></video>
      <img src={image} />
    </Stack>
  );
}
