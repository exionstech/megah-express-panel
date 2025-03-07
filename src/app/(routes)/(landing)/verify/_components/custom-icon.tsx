"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CustomIconProps {
  className?: string;
  src: string;
  alt?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  className = "",
  src,
  alt = "icon",
  size = 24,
  color,
  onClick,
}) => {
  const [colorFilter, setColorFilter] = useState<string>("");

  useEffect(() => {
    if (color) {
      const filter = colorToFilter(color);
      setColorFilter(filter);
    }
  }, [color]);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ 
        width: size, 
        height: size,
        color: color 
      }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-contain select-none pointer-events-none"
        style={{ 
          filter: colorFilter ? `brightness(0) saturate(100%) ${colorFilter}` : undefined 
        }}
      />
    </div>
  );
};

// Helper function to convert color to CSS filter
const colorToFilter = (color: string): string => {
  // Convert hex or named color to RGB
  const tempElement = document.createElement("div");
  tempElement.style.color = color;
  document.body.appendChild(tempElement);
  const rgbColor = window.getComputedStyle(tempElement).color;
  document.body.removeChild(tempElement);

  // Extract RGB values
  const rgbMatch = rgbColor.match(/\d+/g);
  if (!rgbMatch) return "";

  const [r, g, b] = rgbMatch.map(Number);

  return `invert(${r}) sepia(${g}%) saturate(${b}%) hue-rotate(${getHueRotate(r, g, b)}deg)`;
};

// Helper function to calculate hue rotation
const getHueRotate = (r: number, g: number, b: number): number => {
  const hsl = rgbToHsl(r, g, b);
  return hsl[0] * 360;
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number): number[] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
};

export default CustomIcon;