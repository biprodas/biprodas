"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/content/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 15_000);
  return () => clearInterval(timer);
}

/** Current time in Biprodas's timezone; "--:--" during prerender. */
export function LocalTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(Date.now()),
    () => "--:--",
  );
  return <span className="tabular-nums">{time}</span>;
}
