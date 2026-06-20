"use client";

/**
 * WomanRx local shopping cart — no Shopify, no external dependency.
 * State lives in React context + localStorage. Prices come from the WLMD retail
 * tier map (lib/shop/tiers.ts). Peptide checkout completion is parked; the cart
 * is fully functional up to the (placeholder) checkout step.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PEPTIDE_STACK_DISCOUNT_PCT } from "@/lib/shop/tiers";

const STORAGE_KEY = "womanrx_shop_cart_v1";

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  quantity: 1 | 2 | 3; // tier = number of vials/units
  subscribe: boolean;
  unitPrice: number; // per-unit retail at the chosen tier
  count: number; // how many of this exact configuration
  stackAnchor?: string; // set when added as part of a cross-sell stack
};

type AddInput = Omit<CartItem, "count"> & { count?: number };

type CartContextValue = {
  items: CartItem[];
  open: boolean;
  ready: boolean;
  totalCount: number;
  subtotal: number;
  discount: number;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: AddInput) => void;
  setCount: (key: string, count: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const lineKey = (i: Pick<CartItem, "slug" | "quantity" | "subscribe">) =>
  `${i.slug}|${i.quantity}|${i.subscribe ? "sub" : "one"}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  // persist on change (after hydration)
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / privacy mode */
    }
  }, [items, ready]);

  const addItem = useCallback((input: AddInput) => {
    const count = input.count ?? 1;
    setItems((prev) => {
      const key = lineKey(input);
      const existing = prev.find((p) => lineKey(p) === key);
      if (existing) {
        return prev.map((p) =>
          lineKey(p) === key ? { ...p, count: p.count + count } : p
        );
      }
      return [...prev, { ...input, count }];
    });
    setOpen(true);
  }, []);

  const setCount = useCallback((key: string, count: number) => {
    setItems((prev) =>
      count <= 0
        ? prev.filter((p) => lineKey(p) !== key)
        : prev.map((p) => (lineKey(p) === key ? { ...p, count } : p))
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((p) => lineKey(p) !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { subtotal, discount, totalCount } = useMemo(() => {
    let sub = 0;
    let count = 0;
    // group by stackAnchor to apply the stack discount when 2+ stacked lines share an anchor
    const anchorCounts: Record<string, number> = {};
    for (const i of items) {
      if (i.stackAnchor) anchorCounts[i.stackAnchor] = (anchorCounts[i.stackAnchor] || 0) + 1;
    }
    let disc = 0;
    for (const i of items) {
      const lineTotal = i.unitPrice * i.quantity * i.count;
      sub += lineTotal;
      count += i.count;
      if (i.stackAnchor && (anchorCounts[i.stackAnchor] || 0) >= 2) {
        disc += lineTotal * (PEPTIDE_STACK_DISCOUNT_PCT / 100);
      }
    }
    return { subtotal: sub, discount: Math.round(disc), totalCount: count };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      open,
      ready,
      totalCount,
      subtotal,
      discount,
      total: subtotal - discount,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addItem,
      setCount,
      removeItem,
      clear,
    }),
    [items, open, ready, totalCount, subtotal, discount, addItem, setCount, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
