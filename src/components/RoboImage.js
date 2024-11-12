import { useEffect, useRef } from "react";

export const RoboImage = (props) => {
  const { src } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = src;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const { data, width, height } = imageData;

      const grayscaleImg = new Uint8ClampedArray(width * height);
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grayscaleImg[i / 4] = avg;
      }

      // Sobel operator kernels
      const sobelX = [
        [1, 0, -1],
        [2, 0, -2],
        [1, 0, -1],
      ];
      const sobelY = [
        [1, 2, 1],
        [0, 0, 0],
        [-1, -2, -1],
      ];

      const sobelImage = new Uint8ClampedArray(width * height * 4);
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let gradientX = 0;
          let gradientY = 0;

          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const pixelValue = grayscaleImg[(y + ky) * width + (x + kx)];
              gradientX += sobelX[ky + 1][kx + 1] * pixelValue;
              gradientY += sobelY[ky + 1][kx + 1] * pixelValue;
            }
          }

          const magnitude = Math.sqrt(gradientX ** 2 + gradientY ** 2);
          const clampedMagnitude = Math.min(255, Math.max(0, magnitude));

          const index = (y * width + x) * 4;
          sobelImage[index] = clampedMagnitude; // Red channel
          sobelImage[index + 1] = clampedMagnitude; // Green channel
          sobelImage[index + 2] = clampedMagnitude; // Blue channel
          sobelImage[index + 3] = 255; // Alpha channel
        }
      }

      const greenFilteredImg = new Uint8ClampedArray(width * height * 4);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;

          // Red = data[index];
          // Green = data[index + 1];
          // Blue = data[index + 2];
          // Alpha = data[index + 3];
          greenFilteredImg[index] = data[index] - sobelImage[index];
          greenFilteredImg[index + 1] =
            Math.min(255, data[index + 1] + Math.floor(Math.random() * 30));
          greenFilteredImg[index + 2] = data[index + 2] - sobelImage[index];
          greenFilteredImg[index + 3] = data[index + 3];
        }
      }

      const newImageData = new ImageData(greenFilteredImg, width, height);
      context.putImageData(newImageData, 0, 0);
    };
  }, [src]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};
