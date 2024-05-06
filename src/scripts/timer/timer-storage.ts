import { HMS } from "./timer"
import { areHmsEqual, validateAndFixHMS } from "./utils"

const lsTimerKey = "mlnr:timer"
const maxStoredValues = 4

class TimerStorage {
  private timers = [] as HMS[]

  constructor() {
    this.load()
  }

  get() {
    return this.timers
  }

  set(hms: HMS) {
    const index = this.timers.findIndex(existingHms => areHmsEqual(hms, existingHms))
    if (index !== -1) this.timers.splice(index, 1)
    this.timers.unshift(hms)
    this.timers = this.timers.slice(0, maxStoredValues)

    this.save()
  }

  private save() {
    localStorage.setItem(lsTimerKey, JSON.stringify(this.timers))
  }

  private load() {
    try {
      this.timers = (JSON.parse(localStorage.getItem(lsTimerKey)) as HMS[])
        .map(({ h, m, s }) => ({
          h: validateAndFixHMS("h", h),
          m: validateAndFixHMS("m", m),
          s: validateAndFixHMS("s", s),
        }))
        .slice(0, maxStoredValues)
    } catch (e) {/* do nothing */}
  }
}

export const timerStorage = new TimerStorage()
