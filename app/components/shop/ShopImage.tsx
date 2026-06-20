"use client";

import { useState } from "react";
import { C, mono } from "@/lib/design";

/** Product image with a graceful branded fallback while real imagery is pending. */
export function ShopImage({
  src,
  alt,
  rounded = 0,
}: {
  src: string;
  alt: string;
  rounded?: number;
}) {
  const [ok, setOk] = useState(true);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        background: C.brandTint,
        borderRadius: rounded,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setOk(false)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ ...mono({ fontSize: 13, color: C.brand, letterSpacing: "0.14em" }), textTransform: "uppercase", padding: 20, textAlign: "center" }}>
          {alt}
        </span>
      )}
    </div>
  );
}
