"use client";

import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import { v4 as uuidv4 } from "uuid";
import { adjustConfidence } from "./adjustConfidence";
import { BoundingBox } from "./boundingBox";
import { drawCircles } from "./drawCircles";

export default function Detect() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState<string>();
  const [rectangles, setRectangles] = useState<BoundingBox[]>([]);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [thresholds, setThresholds] = useState<number[]>([]);

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

    setRectangles(adjustConfidence(data));
  };

  const captureFrame = async () => {
    if (videoRef.current?.srcObject == null) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = 1080;
    canvas.height = 1920;

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

    if (count % 10 === 0 || (rectangles.length === 0 && count % 5 === 0)) {
      try {
        getRectangles(canvas.toDataURL("image/jpeg", 0.85));
      } catch (error) {
        console.error(error);
      }
    }

    await drawCircles(ctx, rectangles, threshold);
    setImage(canvas.toDataURL("image/jpeg", 0.85));

    if (count % 10 === 0) {
      setThresholds([...thresholds, threshold]);
    }
    setCount((prevCount) => prevCount + 1);
  };

  const onClick = () => {
    fetch(
      "https://script.google.com/macros/s/AKfycbz6NqwQnFB2-iYmcz-Ls3DbkCyWUwP_pAGGFsmu0kNjgiLJkMsDoPEa7omABw-nSEMF/exec",
      {
        method: "POST",
        body: JSON.stringify({
          userId: uuidv4(),
          elapsedTime: timer,
          thresholds: thresholds,
        }),
      }
    );
    setTimeout(() => {
      window.location.href = "/congrats";
    }, 100);
  };

  const handleChange = (_: Event, newThreshold: number | number[]) => {
    setThreshold(newThreshold as number);
  };

  const ref = useRef(captureFrame);
  useEffect(() => {
    ref.current = captureFrame;
  }, [captureFrame]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080,
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

    const intervalID = setInterval(() => {
      ref.current();
      setTimer((prevTimer) => prevTimer + 0.1);
    }, 100);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Div100vh
      style={{
        backgroundColor: "#F2F2F2",
        zIndex: 1,
      }}
    >
      <Stack
        sx={{
          bgcolor: "rgb(255 255 255 / 50%)",
          left: "50%",
          position: "absolute",
          top: "5%",
          transform: "translateX(-50%)",
          width: "90%",
          zIndex: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#252020",
            paddingLeft: "10%",
            paddingTop: 2,
          }}
        >
          Confidence Threshold: {threshold}%
        </Typography>
        <Slider
          value={threshold}
          onChange={handleChange}
          min={25}
          sx={{
            alignSelf: "center",
            color: "#00BFA6",
            width: "80%",
          }}
        />
      </Stack>
      <video ref={videoRef} hidden></video>
      {image && (
        <img
          src={image}
          style={{
            height: "100%",
            left: "50%",
            objectFit: "contain",
            position: "absolute",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            width: "100%",
            zIndex: 2,
          }}
        />
      )}
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          bgcolor: "#EA6A74",
          bottom: "20px",
          position: "absolute",
          right: "20px",
          width: "40%",
          zIndex: 3,
        }}
      >
        Found
      </Button>
    </Div100vh>
  );
}
