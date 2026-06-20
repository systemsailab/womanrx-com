"use client";

import { useEffect, useState } from "react";
import { C, mono } from "@/lib/design";

const MESSAGES = [
  "Free overnight shipping in all 50 states",
  "30-day money-back guarantee",
  "HSA / FSA eligible",
  "No insurance required · One transparent price",
  "Cancel anytime in one click",
];

export function PromoBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % MESSAGES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="promo-bar" role="status" aria-live="polite">
      <span
        style={mono({
          fontSize: 11.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 500,
        })}
      >
        {MESSAGES[i]}
      </span>
    </div>
  );
}
