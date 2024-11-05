import localFont from "next/font/local";
import { Crosshair } from "@/components/crosshair";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Crosshair>
        <main>
          <h1>Robotron</h1>
          <a href="https://google.com">test</a>
        </main>
      </Crosshair>
    </>
  );
}
