import React, { useEffect, useMemo, useState } from "react";

export const Crosshair = ({ children }) => {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const updateDimensions = () => {
    setDimensions({ w: window.innerWidth, h: window.innerHeight });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );
      if (elementUnderCursor && elementUnderCursor.tagName === "A") {
        alert("link!");
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const leftLineStyle = useMemo(
    () => ({
      position: "absolute",
      width: position.x - 10,
      top: position.y,
      left: 0,
      height: 1,
      backgroundColor: "green",
      zIndex: 9999,
      pointerEvents: "none",
    }),
    [position]
  );

  const rightLineStyle = useMemo(
    () => ({
      position: "absolute",
      width: dimensions.w - position.x - 10,
      top: position.y,
      left: position.x + 10,
      height: 1,
      backgroundColor: "green",
      zIndex: 9999,
      pointerEvents: "none",
    }),
    [position, dimensions]
  );

  const topLineStyle = useMemo(
    () => ({
      position: "absolute",
      width: 1,
      top: 0,
      left: position.x,
      height: position.y - 10,
      backgroundColor: "green",
      zIndex: 9999,
      pointerEvents: "none",
    }),
    [position]
  );

  const bottomLineStyle = useMemo(
    () => ({
      position: "absolute",
      width: 1,
      bottom: 0,
      left: position.x,
      height: dimensions.h - position.y - 10,
      backgroundColor: "green",
      zIndex: 9999,
      pointerEvents: "none",
    }),
    [position, dimensions]
  );

  const centerSquareStyle = useMemo(
    () => ({
      width: 20,
      height: 20,
      position: "absolute",
      left: position.x - 10,
      top: position.y - 10,
      border: "1px solid green",
      boxSizing: "border-box",
      zIndex: 9999,
      pointerEvents: "none",
    }),
    [position]
  );

  return (
    <>
      <div style={leftLineStyle} />
      <div style={rightLineStyle} />
      <div style={topLineStyle} />
      <div style={bottomLineStyle} />
      <div style={centerSquareStyle} />
      {children}
    </>
  );
};
