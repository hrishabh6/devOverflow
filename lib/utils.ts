import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (dateString: Date): string => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval;

  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval < 60) {
    return `${interval} min${interval !== 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(interval / 60);
  if (interval < 24) {
    return `${interval} hour${interval !== 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(interval / 24);
  if (interval < 30) {
    return `${interval} day${interval !== 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(interval / 30);
  if (interval < 12) {
    return `${interval} month${interval !== 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(interval / 12);
  return `${interval} year${interval !== 1 ? "s" : ""} ago`;
};

export const formatNumberWithSuffix = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num.toString();
};
