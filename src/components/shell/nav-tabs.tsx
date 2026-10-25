"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export interface TabItem {
  href: string;
  label: string;
  route: string;
  count?: number | string;
  groupedRoutes?: string[];
}

export const MAIN_TABS: TabItem[] = [
  { href: "/dashboard", label: "Dashboard", route: "dashboard" },
  { href: "/orders", label: "Orders", route: "orders", count: 3 },
  { href: "/products", label: "Products", route: "products" },
  { href: "/customers", label: "Customers", route: "customers", groupedRoutes: ["feedback"] },
  { href: "/messages", label: "Messages", route: "messages", count: 2, groupedRoutes: ["email"] },
  { href: "/analytics", label: "Analytics", route: "analytics" },
  { href: "/automations", label: "Automations", route: "automations", groupedRoutes: ["integrations"] },
];

export function NavTabs() {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const prevCoords = useRef<{ l: number; r: number } | null>(null);

  // Determine active route name
  const currentSegment = pathname.split("/")[1] || "dashboard";
  const activeTab = MAIN_TABS.find(
    (t) => t.route === currentSegment || t.groupedRoutes?.includes(currentSegment)
  ) || MAIN_TABS[0];

  useEffect(() => {
    const track = trackRef.current;
    const pill = pillRef.current;
    if (!track || !pill) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetEl = track.querySelector<HTMLAnchorElement>(`[data-route="${activeTab.route}"]`);

    if (!targetEl || !targetEl.offsetWidth) {
      gsap.to(pill, { opacity: 0, duration: 0.2, overwrite: "auto" });
      prevCoords.current = null;
      return;
    }

    const trackWidth = track.scrollWidth;
    const trackHeight = track.offsetHeight;
    const left = targetEl.offsetLeft;
    const right = trackWidth - (targetEl.offsetLeft + targetEl.offsetWidth);
    const top = targetEl.offsetTop;
    const bottom = trackHeight - (targetEl.offsetTop + targetEl.offsetHeight);

    const makeClip = (l: number, r: number) =>
      `inset(${top}px ${r}px ${bottom}px ${l}px round 999px)`;

    if (!prevCoords.current || isReduced) {
      gsap.set(pill, { clipPath: makeClip(left, right) });
      gsap.to(pill, { opacity: 1, duration: 0.2, overwrite: "auto" });
      prevCoords.current = { l: left, r: right };
      return;
    }

    const movingRight = left > prevCoords.current.l;
    const coords = { ...prevCoords.current };
    gsap.killTweensOf(coords);

    gsap.to(pill, { opacity: 1, duration: 0.2, overwrite: "auto" });

    // Asymmetric timing: slower leading edge, faster trailing edge gives physical squash & stretch
    gsap.to(coords, {
      l: left,
      duration: movingRight ? 0.55 : 0.36,
      ease: movingRight ? "power3.inOut" : "power3.out",
      onUpdate: () => gsap.set(pill, { clipPath: makeClip(coords.l, coords.r) }),
    });

    gsap.to(coords, {
      r: right,
      duration: movingRight ? 0.36 : 0.55,
      ease: movingRight ? "power3.out" : "power3.inOut",
      onUpdate: () => gsap.set(pill, { clipPath: makeClip(coords.l, coords.r) }),
    });

    prevCoords.current = { l: left, r: right };
  }, [activeTab.route, pathname]);

  return (
    <nav className="tabs" aria-label="Primary">
      <div ref={trackRef} className="tabs__track">
        {MAIN_TABS.map((tab) => {
          const isCurrent = tab.route === activeTab.route;
          return (
            <Link
              key={tab.route}
              href={tab.href}
              className="tab"
              data-route={tab.route}
              aria-current={isCurrent ? "page" : undefined}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="tab__count" data-count={tab.route}>
                  {tab.count}
                </span>
              )}
            </Link>
          );
        })}

        {/* The ink pill: clipped layer holding light copy of labels */}
        <span ref={pillRef} className="tabs__pill" aria-hidden="true">
          {MAIN_TABS.map((tab) => (
            <span key={tab.route}>
              {tab.label}
              {tab.count !== undefined && (
                <span className="tab__count">{tab.count}</span>
              )}
            </span>
          ))}
        </span>
      </div>
    </nav>
  );
}
