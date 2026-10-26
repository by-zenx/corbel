"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { moveSegmentPill } from "@/lib/segment-motion";

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
  const pillPositioned = useRef(false);

  useEffect(() => {
    if (!group) {
      pillPositioned.current = false;
      return;
    }
    const track = trackRef.current;
    const pill = pillRef.current;
    if (!track || !pill) return;

    const activeItem = group.items.find((i) => pathname === i.href || (i.href !== "/" && pathname.startsWith(i.href))) || group.items[0];
    const targetEl = track.querySelector<HTMLAnchorElement>(`[data-key="${activeItem.key}"]`);

    if (!targetEl || !targetEl.offsetWidth) {
      gsap.to(pill, { opacity: 0, duration: 0.2, overwrite: "auto" });
      pillPositioned.current = false;
      return;
    }
    moveSegmentPill(pill, targetEl, !pillPositioned.current);
    gsap.to(pill, { opacity: 1, duration: 0.2, overwrite: "auto" });
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
