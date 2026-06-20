"use client";

import { useEffect } from "react";

const GA_ID = "G-BGZ10WGW9F";

type GtagCommand = "config" | "event" | "js";
type Gtag = (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: Object[];
    gtag?: Gtag;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: Parameters<Gtag>) {
      window.dataLayer?.push(args);
    };
  return window.gtag;
}

function track(eventName: string, params: Record<string, unknown> = {}) {
  const gtag = ensureGtag();
  gtag("event", eventName, {
    send_to: GA_ID,
    event_source: "womanrx_site",
    ...params,
  });
}

function closestInteractive(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest("a, button");
}

function interactionArea(element: Element) {
  if (element.closest(".sticky-bottom-cta")) return "sticky_cta";
  if (element.closest("header, nav")) return "navigation";
  if (element.closest(".content-article-card")) return "content_card";
  if (element.closest(".article-toc")) return "article_toc";
  if (element.closest(".product-card")) return "product_card";
  if (element.closest("footer")) return "footer";
  return "body";
}

function safePath(url: string) {
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== window.location.origin) return parsed.hostname;
    return parsed.pathname;
  } catch {
    return "unknown";
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    ensureGtag();

    let previousPath = `${window.location.pathname}${window.location.search}`;
    const sentToolEvents = new Set<string>();
    const sentSearchEvents = new Set<string>();

    const sendVirtualPageView = () => {
      const nextPath = `${window.location.pathname}${window.location.search}`;
      if (nextPath === previousPath) return;
      previousPath = nextPath;
      window.gtag?.("event", "page_view", {
        send_to: GA_ID,
        page_path: nextPath,
        page_location: window.location.href,
        event_source: "womanrx_site",
      });
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function pushState(...args) {
      const result = originalPushState.apply(this, args);
      window.setTimeout(sendVirtualPageView, 0);
      return result;
    };

    window.history.replaceState = function replaceState(...args) {
      const result = originalReplaceState.apply(this, args);
      window.setTimeout(sendVirtualPageView, 0);
      return result;
    };

    const onPopState = () => window.setTimeout(sendVirtualPageView, 0);

    const onClick = (event: MouseEvent) => {
      const element = closestInteractive(event.target);
      if (!element) return;

      const href = element instanceof HTMLAnchorElement ? element.href : "";
      const destination = href ? safePath(href) : undefined;
      const area = interactionArea(element);

      if (href) {
        const parsed = new URL(href, window.location.origin);
        if (parsed.origin !== window.location.origin) {
          track("outbound_click", {
            link_domain: parsed.hostname,
            interaction_area: area,
          });
        }

        if (parsed.pathname.startsWith("/weight-loss-intake")) {
          window.sessionStorage.setItem("hrx_begin_intake_sent", "1");
          track("begin_intake", {
            interaction_area: area,
            destination,
          });
        }

        if (parsed.pathname.startsWith("/tools/")) {
          track("select_tool", {
            tool_path: parsed.pathname,
            interaction_area: area,
          });
        }
      }

      if (area === "content_card") {
        track("select_content", {
          content_type: "article_card",
          destination,
        });
      }

      if (area === "article_toc") {
        track("select_content", {
          content_type: "table_of_contents",
          destination,
        });
      }

      if (element instanceof HTMLButtonElement && element.closest(".content-filters")) {
        track("library_filter_select", {
          library_path: window.location.pathname,
        });
      }
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      track("generate_lead", {
        form_path: window.location.pathname,
        form_type: window.location.pathname.includes("contact") ? "contact" : "site_form",
      });
    };

    const onChange = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

      if (target.closest(".content-search")) {
        const context = window.location.pathname === "/blog" ? "blog" : "topic_hub";
        const key = `search:${context}:${window.location.pathname}`;
        if (sentSearchEvents.has(key)) return;
        sentSearchEvents.add(key);
        track("site_search_used", {
          search_context: context,
        });
        return;
      }

      if (window.location.pathname.startsWith("/tools/")) {
        const key = window.location.pathname;
        if (sentToolEvents.has(key)) return;
        sentToolEvents.add(key);
        track("tool_interaction", {
          tool_path: key,
        });
      }
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("submit", onSubmit, { capture: true });
    document.addEventListener("change", onChange, { capture: true });
    document.addEventListener("input", onChange, { capture: true });

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("submit", onSubmit, { capture: true });
      document.removeEventListener("change", onChange, { capture: true });
      document.removeEventListener("input", onChange, { capture: true });
    };
  }, []);

  return null;
}
