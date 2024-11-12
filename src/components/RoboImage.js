import { useEffect, useRef } from 'react';

export const RoboImage = (props) => {
  const { src } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    // Checks if the window object is available to ensure we are in a browser environment
    if (typeof window === 'undefined' || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = src;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const { data, width, height } = imageData;

      const imgData = [];
      for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const pixel = [
            data[index],     // Red
            data[index + 1], // Green
            data[index + 2], // Blue
            data[index + 3], // Alpha
          ];
          row.push(pixel);
        }
        imgData.push(row);
      }

      const greenFilteredImg = new Uint8ClampedArray(width * height * 4);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const pixel = imgData[y][x];
          greenFilteredImg[index] = pixel[0] / 2;
          greenFilteredImg[index + 1] = pixel[1] + Math.floor(Math.random() * 50);
          greenFilteredImg[index + 2] = pixel[2] / 2;
          greenFilteredImg[index + 3] = pixel[3];
        }
      }

      // Creates a new ImageData object and put it back onto the canvas
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
