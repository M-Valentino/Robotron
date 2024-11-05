import React, { useEffect, useState } from "react";

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
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      {/* Left line */}
      <div
        style={{
          position: "absolute",
          width: `calc(${position.x}px - 10px)`,
          top: position.y,
          left: 0,
          height: 1,
          backgroundColor: "green",
          zIndex: 9999,
        }}
      />
      {/* Right Line */}
      <div
        style={{
          position: "absolute",
          width: `calc(${dimensions.w}px - ${position.x}px - 10px)`,
          top: position.y,
          left: `calc(${position.x}px + 10px)`,
          height: 1,
          backgroundColor: "green",
          zIndex: 9999,
        }}
      />
      {/* Top Line */}
      <div
        style={{
          position: "absolute",
          width: 1,
          top: 0,
          left: position.x,
          height: `calc(${position.y}px - 10px)`,
          backgroundColor: "green",
          zIndex: 9999,
        }}
      />
      {/* Bottom Line */}
      <div
        style={{
          position: "absolute",
          width: 1,
          bottom: 0,
          left: position.x,
          height: `calc(${dimensions.h}px - ${position.y}px - 10px)`,
          backgroundColor: "green",
          zIndex: 9999,
        }}
      />
      <div
        style={{
          width: 20,
          height: 20,
          position: "absolute",
          left: position.x - 10,
          top: position.y - 10,
          border: "1px solid green",
          boxSizing: "border-box"
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 999,
          cursor: "none",
        }}
      >
        {children}
      </div>
    </>
  );
};
