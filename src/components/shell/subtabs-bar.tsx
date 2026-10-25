"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface SubtabConfig {
  key: string;
  items: { href: string; label: string; key: string }[];
}

const SUBTAB_GROUPS: Record<string, SubtabConfig> = {
  customers: {
    key: "customers",
    items: [
      { href: "/customers", label: "Customers", key: "customers" },
      { href: "/feedback", label: "Feedback", key: "feedback" },
    ],
  },
  feedback: {
    key: "customers",
    items: [
      { href: "/customers", label: "Customers", key: "customers" },
      { href: "/feedback", label: "Feedback", key: "feedback" },
    ],
  },
  messages: {
    key: "messages",
    items: [
      { href: "/messages", label: "Inbox", key: "messages" },
      { href: "/email", label: "Email", key: "email" },
    ],
  },
  email: {
    key: "messages",
    items: [
      { href: "/messages", label: "Inbox", key: "messages" },
      { href: "/email", label: "Email", key: "email" },
    ],
  },
  automations: {
    key: "automations",
    items: [
      { href: "/automations", label: "Automations", key: "automations" },
      { href: "/integrations", label: "Integrations", key: "integrations" },
    ],
  },
  integrations: {
    key: "automations",
    items: [
      { href: "/automations", label: "Automations", key: "automations" },
      { href: "/integrations", label: "Integrations", key: "integrations" },
    ],
  },
  workspace: {
    key: "workspace",
    items: [
      { href: "/workspace/spring-launch", label: "Spring Launch", key: "spring-launch" },
      { href: "/workspace/retail-plan", label: "Retail Plan", key: "retail-plan" },
    ],
  },
};

export function SubtabsBar() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "";
  const group = SUBTAB_GROUPS[segment];

  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const prevCoords = useRef<{ l: number; r: number } | null>(null);

  useEffect(() => {
    if (!group) return;
    const track = trackRef.current;
    const pill = pillRef.current;
    if (!track || !pill) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const activeItem = group.items.find((i) => pathname === i.href || (i.href !== "/" && pathname.startsWith(i.href))) || group.items[0];
    const targetEl = track.querySelector<HTMLAnchorElement>(`[data-key="${activeItem.key}"]`);

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
  }, [group, pathname]);

  if (!group) {
    return (
      <nav className="subtabs" aria-label="In this section" hidden>
        <div className="subtabs__track">
          <span className="subtabs__pill" aria-hidden="true" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="subtabs" aria-label="In this section">
      <div ref={trackRef} className="subtabs__track">
        {group.items.map((item) => {
          const isCurrent = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.key}
              href={item.href}
              className="subtab"
              data-key={item.key}
              aria-current={isCurrent ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <span ref={pillRef} className="subtabs__pill" aria-hidden="true" />
      </div>
    </nav>
  );
}
