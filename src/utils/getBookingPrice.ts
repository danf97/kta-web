import moment from "moment";
import { RateOutput } from "./expandRates";

export const getBookingPrice = (
  checkIn: Date,
  checkOut: Date,
  priceRate: RateOutput[],
  lang: "pt" | "en"
) => {
  console.log("priceRate", priceRate);

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Calculate nights
  const nights = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (nights <= 0) {
    return { valid: false, reason: "Checkout must be after checkin" };
  }

  // Get data for check-in and check-out days
  const checkInObj = priceRate.find(
    (d) => d.date === moment(checkInDate).format("YYYY-MM-DD")
  );
  const checkOutObj = priceRate.find(
    (d) => d.date === moment(checkOutDate).format("YYYY-MM-DD")
  );

  console.log("checkInObj", checkInObj);

  if (!checkInObj || !checkOutObj) {
    return { valid: true, reason: "Dates only available upon request." };
  }

  // Validate check-in day
  const checkInDay = checkInDate
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  if (!checkInObj.checkInDays[checkInDay]) {
    const allowedDays = Object.entries(checkInObj.checkInDays)
      .filter(([_, allowed]) => allowed)
      .map(([day]) => day)
      .join(", ");
    return {
      valid: false,
      reason: `Check-in not allowed on ${checkInDay}. Allowed days: ${allowedDays}`,
    };
  }

  // Validate check-out day
  const checkOutDay = checkOutDate
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toLowerCase();
  console.log("checkOutDay", checkOutDay);
  if (!checkOutObj.checkOutDays[checkOutDay]) {
    const allowedDays = Object.entries(checkOutObj.checkOutDays)
      .filter(([_, allowed]) => allowed)
      .map(([day]) => day)
      .join(", ");
    return {
      valid: false,
      reason: `Check-out not allowed on ${checkOutDay}. Allowed days: ${allowedDays}`,
    };
  }

  // Validate min stay
  if (nights < checkInObj.minStay) {
    return {
      valid: false,
      reason: `Minimum stay is ${checkInObj.minStay} nights`,
    };
  }

  // Calculate total price
  let totalPrice = 0;
  const current = new Date(checkInDate);
  while (current < checkOut) {
    const dayObj = priceRate.find(
      (d) => new Date(d.date).toDateString() === current.toDateString()
    );
    if (!dayObj)
      return { valid: false, reason: "Missing price data for some nights" };

    totalPrice += dayObj.price;
    current.setDate(current.getDate() + 1);
  }

  return { valid: true, nights, totalPrice };
};
