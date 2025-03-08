import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUserID = () => {
  const uuid = uuidv4().replace(/-/g, "").toUpperCase();
  let uniquePart = "";

  for (let i = 0; i < 7; i++) {
    const char = uuid[Math.floor(Math.random() * uuid.length)];
    uniquePart += char;
  }

  return `MEU${uniquePart}`;
};

export function formatedString(value: string) {
  let str = value.trim();
  if (str.length > 10) {
    str = str.substring(0, 8) + "..." + str.substring(str.length - 5);
  }
  return str;
}
