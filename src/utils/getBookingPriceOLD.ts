import { PropertyQueryResult } from "@/sanity/queries/documents/property";

export const getBookingPriceOLD = (
  checkIn: Date,
  checkOut: Date,
  priceTable: PropertyQueryResult["pricingTable"]
) => {
  const checkInDate = new Date(checkIn);
  console.log("checkInDate", checkInDate);
  const checkOutDate = new Date(checkOut);
  console.log("checkOutDate", checkOutDate);
  const nights =
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
  console.log("nights", nights);

  if (nights <= 0) {
    return { error: "Checkout must be after check-in" };
  }
  if (!priceTable || priceTable.length === 0) {
    return { error: "For these dates please request an estimate" };
  }
  let totalPrice = 0;
  const currentDay = new Date(checkInDate);

  while (currentDay < checkOutDate) {
    // Find matching rule for this date
    const matched = priceTable.find((p) => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      return currentDay >= start && currentDay <= end;
    });

    console.log("matched", matched);

    if (!matched) {
      return {
        error: `No prices are available for these dates. Please request an estimate.`,
      };
    }

    // --- Check-in day validation (only on first night) ---
    if (currentDay.getTime() === checkInDate.getTime()) {
      const weekday = currentDay
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      if (!matched.checkInDays[weekday]) {
        const validDays = Object.keys(matched.checkInDays)
          .filter((d) => matched.checkInDays[d])
          .map((d) => d.charAt(0).toUpperCase() + d.slice(1))
          .join(", ");
        return {
          error: `Invalid check-in day: ${weekday}. Valid days: ${validDays}`,
        };
      }

      if (nights < matched.minStay) {
        return { error: `Minimum stay is ${matched.minStay} nights` };
      }
    }

    // --- Check-out day validation (only on final day) ---
    if (currentDay.getTime() + nights * 86400000 === checkOutDate.getTime()) {
      const weekday = checkOutDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (!matched.checkOutDays[weekday]) {
        const validDays = Object.keys(matched.checkOutDays)
          .filter((d) => matched.checkOutDays[d])
          .join(", ");
        return {
          error: `Invalid check-out day: ${weekday}. Valid days: ${validDays}`,
        };
      }
    }

    // --- How many nights remain under this rule ---
    const periodEnd = new Date(matched.endDate);
    const nightsInPeriod = Math.min(
      (checkOutDate - currentDay) / 86400000,
      (periodEnd - currentDay) / 86400000 + 1
    );

    totalPrice += nightsInPeriod * matched.pricePerNight;
    currentDay.setDate(currentDay.getDate() + nightsInPeriod);
  }

  return { nights, totalPrice };
};
