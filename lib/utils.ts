import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function convertTo24HourFormat(time: string): string {
  const [hoursMinutes, period] = time.split(" "); // Split the time and period (AM/PM)
  const [hours, minutes] = hoursMinutes.split(":"); // Split the hours and minutes

  let hoursNumber = parseInt(hours, 10); // Convert hours to integer

  // Convert hours based on AM/PM
  if (period.toLowerCase() === "pm" && hoursNumber !== 12) {
    hoursNumber += 12;
  } else if (period.toLowerCase() === "am" && hoursNumber === 12) {
    hoursNumber = 0;
  }

  // Format hours and minutes to always be 2 digits
  const formattedHours = hoursNumber.toString().padStart(2, "0");
  const formattedMinutes = minutes.padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
