import React, { useEffect, useState } from "react";

export const Robotyping = (props) => {
  const { text } = props;
  const textLength = text.length;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const [textDisplay, setTextDisplay] = useState("");

  useEffect(() => {
    const displayText = async () => {
      for (let i = 0; i <= textLength; i++) {
        setTextDisplay(text.slice(0, i - 1) + ";");
        await sleep(20);
        setTextDisplay(text.slice(0, i - 1) + "1");
        await sleep(40);
        setTextDisplay(text.slice(0, i - 1) + "0̴̮͘");
        await sleep(20);
        setTextDisplay(text.slice(0, i));
      }
    };

    displayText();
  }, []);

  return <>{textDisplay}</>;
};
