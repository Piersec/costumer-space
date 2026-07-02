import { useEffect, useState } from "react";

export function useDominantColor(imageUrl?: string | null) {
  const [color, setColor] = useState("#1f2937");

  useEffect(() => {
    if (!imageUrl) {
      setColor("#1f2937");
      return;
    }

    let isCancelled = false;
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
      if (isCancelled) return;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        setColor("#1f2937");
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
      let red = 0;
      let green = 0;
      let blue = 0;
      let count = 0;

      for (let index = 0; index < data.length; index += 16) {
        red += data[index];
        green += data[index + 1];
        blue += data[index + 2];
        count += 1;
      }

      if (count > 0) {
        const averageColor = `rgb(${Math.round(red / count)}, ${Math.round(green / count)}, ${Math.round(blue / count)})`;
        setColor(averageColor);
      } else {
        setColor("#1f2937");
      }
    };

    image.onerror = () => {
      if (!isCancelled) {
        setColor("#1f2937");
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [imageUrl]);

  return color;
}
