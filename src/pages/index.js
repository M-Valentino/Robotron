import localFont from "next/font/local";
import { Crosshair } from "@/components/Crosshair";
import { Robotyping } from "@/components/Robotyping";
import { RoboImage } from "@/components/RoboImage";
import {ThreeDButton} from "@/components/ThreeDButton";

import { Inconsolata } from "next/font/google";
const inconsolata = Inconsolata({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Crosshair>
        <main
           className={`${inconsolata.className}`}
        >
          <h1>
            <Robotyping text="Mark Valentino" />
          </h1>
          <a href="https://google.com">test</a>
          <br />
          <RoboImage src="parrot.jpg" />
          <ThreeDButton/>
        </main>
      </Crosshair>
    </>
  );
}
