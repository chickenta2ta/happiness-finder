"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Div100vh from "react-div-100vh";

export default function Congrats() {
  return (
    <Div100vh
      style={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          height: "100%",
          left: "50%",
          position: "absolute",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        <Typography variant="h4" sx={{ color: "#252020" }}>
          Congrats!
        </Typography>
        <Typography variant="body1" sx={{ color: "#252020", paddingBottom: 4 }}>
          You&apos;ve found a four-leaf clover;
          <br />
          you&apos;re in for some good luck
          <br />
          and will spend the day happily!
        </Typography>
        <Image
          src="/clover.png"
          alt="Four-Leaf Clover"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={658}
          height={658}
        />
        <Button
          href="https://forms.gle/r6pgBwW9trHWenBs5"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#EA6A74",
            top: "32px",
          }}
        >
          Go to questionnaire
        </Button>
      </Stack>
    </Div100vh>
  );
}
