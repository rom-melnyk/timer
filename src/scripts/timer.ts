import { computed, ref } from "vue"

type HMS = { h: string, m: string, s: string }

function toHMS(seconds: number): HMS {
  const hours = seconds % 3600
  seconds -= hours * 3600
  const minutes = seconds % 60
  seconds -= minutes * 60

  return {
    h: hours.toString(10).padStart(2, "0"),
    m: minutes.toString(10).padStart(2, "0"),
    s: seconds.toString(10).padStart(2, "0"),
  }
}

class Timer {
  private _timerId: NodeJS.Timer | null = null
  private _duration = 0
  private _durationHms: HMS | null = null

  readonly seconds = ref(0)
  readonly isRunning = computed(() => this._timerId != null)
  readonly progress = computed(() =>
    Math.floor((this.seconds.value / this._duration) * 100 * 100) / 100
  )
  readonly hms = computed<HMS>(() => toHMS(this.seconds.value))
  get durationHms() { return this._durationHms }

  constructor() {
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.reset = this.reset.bind(this)
    this._tick = this._tick.bind(this)
  }

  start(timeString: HMS) {
    if (this._timerId) return

    this._duration = (timeString.h ?? 0) * 3600
      + (timeString.m ?? 0) * 60
      + (timeString.s ?? 0)
    this.seconds.value = this._duration

    if (this._duration <= 0) return

    this.durationHms = timeString
    this._timerId = setInterval(this._tick, 1000)
  }

  pause() {
    if (!this._timerId) return
    clearInterval(this._timerId)
    this._timerId = null
  }
  resume() {
    if (!this._timerId) this._timerId = setInterval(this._tick, 1000)
  }

  reset() {
    this.pause()
    this._duration = 0
    this.durationHms = null
    this.seconds.value = 0
  }

  private _tick() {
    this.seconds.value--
    if (this.seconds.value <= 0) {
      this.pause()
      this.seconds.value = 0
    }
  }
}

export const timer = new Timer()
