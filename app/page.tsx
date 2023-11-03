"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Div100vh from "react-div-100vh";

export default function Home() {
  return (
    <Div100vh
      style={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#252020", paddingLeft: 2.5, paddingTop: 10 }}
      >
        Happiness Finder
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "#252020", paddingLeft: 2.5 }}
      >
        An app to help find four-leaf clovers
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          color: "#EA6A74",
          paddingLeft: 2.5,
          paddingTop: 2,
        }}
      >
        Recommended (Tested) Browsers:
        <br /> - Safari for iOS
        <br /> - Chrome for Android
      </Typography>
      <Image
        src="/home.svg"
        alt="Explore Logo"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        width={890}
        height={779}
      />
      <Button
        href="/detect"
        variant="contained"
        sx={{
          bgcolor: "#00BFA6",
          bottom: "5%",
          left: "50%",
          position: "absolute",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        Start
      </Button>
    </Div100vh>
  );
}
