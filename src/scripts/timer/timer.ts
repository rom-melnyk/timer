import { computed, ref } from "vue"
import { hmsToSeconds } from "./utils"

export type HMS = { h: number, m: number, s: number }
export type HmsString = { h: string, m: string, s: string }

const dummyFn = () => {}

class Timer {
  private _timerId = ref(null as NodeJS.Timer | null)
  private _duration = 0
  private _durationHms: HMS | null = null
  private _onDone = dummyFn

  readonly seconds = ref(0)
  readonly isRunning = computed(() => this._timerId.value != null)
  readonly progress = computed(() => this.seconds.value / this._duration)
  get durationHms() { return this._durationHms }

  constructor() {
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.reset = this.reset.bind(this)
    this._tick = this._tick.bind(this)
  }

  start(hms: HMS, onDone?: () => void) {
    if (this._timerId.value) return

    this._duration = hmsToSeconds(hms)
    if (this._duration <= 0) return

    this._durationHms = hms
    this.seconds.value = this._duration
    this._onDone = onDone ?? dummyFn

    this._timerId.value = setInterval(this._tick, 1000)
  }

  pause() {
    if (!this._timerId.value) return

    clearInterval(this._timerId.value)
    this._timerId.value = null
  }

  resume() {
    if (!this._timerId.value) this._timerId.value = setInterval(this._tick, 1000)
  }

  reset() {
    this.pause()

    this._duration = 0
    this._durationHms = null
    this.seconds.value = 0
    this._onDone = dummyFn
  }

  private _tick() {
    this.seconds.value--
    if (this.seconds.value <= 0) {
      this.pause()
      this.seconds.value = 0
      this._onDone()
    }
  }
}

export const timer = new Timer()
