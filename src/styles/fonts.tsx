import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export { ibm };
