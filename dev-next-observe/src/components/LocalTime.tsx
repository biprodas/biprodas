"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Dhaka",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/** Current time in Dhaka. Renders nothing on the server, so the prerendered page has no clock. */
export function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(Date.now()),
    () => null,
  );
  return time ? <span suppressHydrationWarning>{time} GMT+6</span> : <span>Asia/Dhaka</span>;
}
