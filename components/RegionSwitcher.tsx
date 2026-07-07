'use client';

import { getSisterUrl, getSisterLabel, getSisterFlag, isRussia } from '@/lib/locale';

/**
 * Region Switcher — floating link between ru.svet.global ⇄ svet.global.
 * Shows in the bottom-left corner, subtle but always accessible.
 */
export function RegionSwitcher() {
  const sisterUrl = getSisterUrl();
  const label = getSisterLabel();
  const flag = getSisterFlag();

  return (
    <a
      href={sisterUrl}
      className="region-switcher"
      title={label}
      aria-label={label}
    >
      <span className="region-switcher__flag">{flag}</span>
      <span className="region-switcher__label">{label}</span>
    </a>
  );
}
