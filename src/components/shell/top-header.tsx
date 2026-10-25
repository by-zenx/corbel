"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/svg-sprite";
import { NavTabs } from "./nav-tabs";

interface TopHeaderProps {
  onOpenNotifications?: () => void;
  isNotificationsOpen?: boolean;
  hasUnread?: boolean;
}

export function TopHeader({ onOpenNotifications, isNotificationsOpen = false, hasUnread = true }: TopHeaderProps) {
  return (
    <header className="top">
      <Link className="brand" href="/dashboard" aria-label="Corbel: dashboard">
        <span className="brand__mark">
          <Icon name="logo" />
        </span>
        <span className="brand__txt">
          <b>Corbel Supply Co.</b>
          <small>Pro trial, 9 days left</small>
        </span>
      </Link>

      <NavTabs />

      <div className="top__tools">
        <button
          className="ibtn ibtn--glass"
          type="button"
          id="bell-btn"
          aria-label="Notifications"
          aria-haspopup="dialog"
          aria-expanded={isNotificationsOpen}
          onClick={onOpenNotifications}
        >
          <Icon name="bell" />
          {hasUnread && <span className="bell__dot" />}
        </button>

        <div className="team" aria-label="Team online: 4 people">
          <span className="av av--sm" style={{ ["--h" as any]: "206" }}>
            MR
          </span>
          <span className="av av--sm" style={{ ["--h" as any]: "162" }}>
            JO
          </span>
          <span className="av av--sm" style={{ ["--h" as any]: "12" }}>
            AP
          </span>
          <span className="av av--sm av--more">+2</span>
        </div>

        <Link className="me" href="/settings" aria-label="Your profile: Mara Reyes">
          <span className="av" style={{ ["--h" as any]: "206" }}>
            MR
          </span>
        </Link>
      </div>
    </header>
  );
}
