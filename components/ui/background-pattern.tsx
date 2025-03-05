"use client";

import { LucideProps } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const BackgroundPattern = (props: LucideProps) => {
  const { resolvedTheme } = useTheme();
  const [strokeColor, setStrokeColor] = useState("#E4E7EC"); 

  useEffect(() => {
    setStrokeColor(resolvedTheme === "light" ? "#2D3748" : "#E4E7EC");
  }, [resolvedTheme]);

  return (
    <svg
      width="768"
      height="736"
      viewBox="0 0 768 736"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <mask
        id="mask0_5036_374506"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="-32"
        width="768"
        height="768"
      >
        <rect
          width="768"
          height="768"
          transform="translate(0 -32)"
          fill="url(#paint0_radial_5036_374506)"
        />
      </mask>
      <g mask="url(#mask0_5036_374506)">
        <g clipPath="url(#clip0_5036_374506)">
          <g clipPath="url(#clip1_5036_374506)">
            {[...Array(17)].map((_, i) => (
              <line
                key={i}
                x1={`${i * 48 + 0.5}`}
                y1="-32"
                x2={`${i * 48 + 0.5}`}
                y2="736"
                stroke={strokeColor}
              />
            ))}
          </g>
          <rect x="0.5" y="-31.5" width="767" height="767" stroke={strokeColor} />
          <g clipPath="url(#clip2_5036_374506)">
            {[...Array(16)].map((_, i) => (
              <line
                key={i}
                y1={`${i * 48 + 15.5}`}
                x2="768"
                y2={`${i * 48 + 15.5}`}
                stroke={strokeColor}
              />
            ))}
          </g>
          <rect x="0.5" y="-31.5" width="767" height="767" stroke={strokeColor} />
        </g>
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_5036_374506"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(384 384) rotate(90) scale(384 384)"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_5036_374506">
          <rect width="768" height="768" fill="white" transform="translate(0 -32)" />
        </clipPath>
        <clipPath id="clip1_5036_374506">
          <rect y="-32" width="768" height="768" fill="white" />
        </clipPath>
        <clipPath id="clip2_5036_374506">
          <rect y="-32" width="768" height="768" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BackgroundPattern;
