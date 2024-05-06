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

const clamps: { [key in keyof HMS]: { min: number, max: number } } = {
  h: { min: 0, max: 99 },
  m: { min: 0, max: 59 },
  s: { min: 0, max: 59 },
}

export function validateAndFixHMS(key: keyof HMS, value: number) {
  return Math.max(
    clamps[key].min,
    Math.min(clamps[key].max, value)
  )
}

export function areHmsEqual(hms1: HMS, hms2: HMS) {
  return hms1.h === hms2.h
    && hms1.m === hms2.m
    && hms1.s === hms2.s
}
