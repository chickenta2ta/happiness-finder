import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Home() {
  return (
    <Stack sx={{ bgcolor: "#F2F2F2", height: "100vh" }}>
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
      <Image src="/home.svg" alt="Explore Logo" fill={true} />
      <Button
        href="/detect"
        variant="contained"
        sx={{
          bgcolor: "#00BFA6",
          bottom: "10%",
          left: "50%",
          position: "absolute",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        Start
      </Button>
    </Stack>
  );
}
