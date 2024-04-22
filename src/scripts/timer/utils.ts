import type { HMS, HmsString } from "./timer"

export function secondsToHms(seconds: number): HMS {
  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60

  return { h: hours, m: minutes, s: seconds, }
}

export function hmsToSeconds({ h, m, s }: HMS): number {
  return (h ?? 0) * 3600
    + (m ?? 0) * 60
    + (s ?? 0)
}

export function formatHms({ h, m, s }: HMS): HmsString {
  return {
    h: h.toString(10).padStart(2, "0"),
    m: m.toString(10).padStart(2, "0"),
    s: s.toString(10).padStart(2, "0"),
  }
}

