import { computed, ref } from "vue"

export type HMS = { h: number, m: number, s: number }
export type HMSString = { h: string, m: string, s: string }

function toHMSString(seconds: number): HMSString {
  const hours = Math.floor(seconds / 3600)
  seconds -= hours * 3600
  const minutes = Math.floor(seconds / 60)
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
  private _durationString: HMS | null = null

  readonly seconds = ref(0)
  readonly isRunning = computed(() => this._timerId != null)
  readonly progress = computed(() =>
    Math.floor((this.seconds.value / this._duration) * 100 * 100) / 100
  )
  readonly hmsString = computed<HMSString>(() => toHMSString(this.seconds.value))
  get durationString() { return this._durationString }

  constructor() {
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.reset = this.reset.bind(this)
    this._tick = this._tick.bind(this)
  }

  start({ h, m, s }: HMS) {
    if (this._timerId) return

    this._duration = (h ?? 0) * 3600
      + (m ?? 0) * 60
      + (s ?? 0)

    if (this._duration <= 0) return

    this.seconds.value = this._duration
    this._durationString = toHMSString(this._duration)
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
