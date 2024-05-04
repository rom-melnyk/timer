import { computed, ref } from "vue"
import { hmsToSeconds } from "./utils"

export type HMS = { h: number, m: number, s: number }
export type HmsString = { h: string, m: string, s: string }

const dummyFn = () => {}

class Timer {
  private _timerId = null as NodeJS.Timer | null
  private _durationSeconds = 0
  private _durationHms: HMS | null = null
  private _onDone = dummyFn

  readonly remainedSeconds = ref(0)
  readonly progress = computed(() => this.remainedSeconds.value / this._durationSeconds)
  get durationHms() { return this._durationHms }

  constructor() {
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.reset = this.reset.bind(this)
    this._tick = this._tick.bind(this)
  }

  set(hms: HMS | null) {
    this._durationSeconds = hms ? hmsToSeconds(hms) : 0
    this._durationHms = hms
  }

  start(onDone?: () => void) {
    if (this._timerId) return
    if (this._durationSeconds <= 0) return


    this.remainedSeconds.value = this._durationSeconds
    this._onDone = onDone ?? dummyFn

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

    this.remainedSeconds.value = 0
    this._onDone = dummyFn
  }

  private _tick() {
    this.remainedSeconds.value--
    if (this.remainedSeconds.value <= 0) {
      this.pause()
      this.remainedSeconds.value = 0
      this._onDone()
    }
  }
}

export const timer = new Timer()
