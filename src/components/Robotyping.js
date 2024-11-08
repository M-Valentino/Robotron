import React, { useEffect, useState } from "react";

export const Robotyping = (props) => {
  const { text } = props;
  const textLength = text.length;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const [textDisplay, setTextDisplay] = useState("");

  useEffect(() => {
    const displayText = async () => {
      for (let i = 0; i <= textLength; i++) {
        if (i > 0) {
          setTextDisplay(text.slice(0, i - 1) + ";");
          await sleep(textLength + 5 - i);
          setTextDisplay(text.slice(0, i - 1) + "1");
          await sleep(textLength + 3  - i);
          setTextDisplay(text.slice(0, i - 1) + "0̴̮͘");
          await sleep(textLength - i);
        }
        setTextDisplay(text.slice(0, i));
        const sleepTime = () => Math.max(textLength * 10 - (i * 2), 0);
        await sleep(sleepTime);
      }
    };

    displayText();
  }, []);

  return <>{textDisplay}</>;
};
