const canvasSize = 64

class Favicon {
  private readonly linkEl = document.createElement("link")

  private readonly canvas = document.createElement("canvas")
  private readonly ctx = this.canvas.getContext("2d")
  private readonly gradient = this.ctx.createLinearGradient(0, canvasSize, canvasSize, 0)
  private readonly white = "hsl(195, 3%, 95%)"

  private readonly textBase = "normal 48px/1 sans-serif"
  private readonly textSm = "normal 36px/1 sans-serif"

  private animationId = null as NodeJS.Timer | null
  private readonly animationRate = 25 // FPS

  constructor() {
    // <link rel="icon" type="image/png" href=".">
    this.linkEl.rel = "icon"
    this.linkEl.type = "image/png"
    document.head.appendChild(this.linkEl)

    this.canvas.width = canvasSize
    this.canvas.height = canvasSize

    this.gradient.addColorStop(0.0, "hsl(195, 80%, 55%)")
    this.gradient.addColorStop(0.5, "hsl(195, 80%, 35%)")
    this.gradient.addColorStop(1.0, "hsl(195, 80%, 55%)")

    this.ctx.textAlign = "left"
    this.ctx.textBaseline = "alphabetic"

    // this.ctx.fillStyle = this.gradient
    // this.ctx.font = "sans-serif 48px"
  }

  setDefaultIcon() {
    this.stopAnimation()

    this.ctx.clearRect(0, 0, canvasSize, canvasSize)
    this.ctx.fillStyle = this.gradient

    this.ctx.globalAlpha = 1.0
    this.ctx.font = this.textBase
    this.ctx.fillText("🕑", 0, 48)

    this.updateFavicon()
  }

  setRunningIcon() {
    this.stopAnimation()

    let angle = 0.0
    const step = Math.PI / 40
    let useStart = false

    this.animationId = setInterval(() => {
      angle += step
      if (angle >= Math.PI * 2) {
        angle = 0
        useStart = !useStart
      }

      this.drawRunningIcon(angle, useStart)
    }, 1000 / this.animationRate)
  }

  private drawRunningIcon(angle: number, useStart: boolean) {
    this.ctx.clearRect(0, 0, canvasSize, canvasSize)

    this.ctx.globalAlpha = .3
    this.ctx.font = this.textBase
    this.ctx.fillText("🕑", -6, 42)

    this.ctx.lineWidth = 8
    const size = 14
    const cx = canvasSize - size - this.ctx.lineWidth / 2
    const cy = canvasSize - size - this.ctx.lineWidth / 2

    this.ctx.globalAlpha = 1.0
    this.ctx.strokeStyle = this.gradient
    this.ctx.beginPath()
    this.ctx.ellipse(cx, cy, size, size, -Math.PI / 2, useStart ? angle : 0, useStart ? Math.PI * 2 : angle)
    // this.ctx.fill()
    this.ctx.stroke()

    this.updateFavicon()
  }

  setPauseIcon() {
    this.stopAnimation()

    this.ctx.clearRect(0, 0, canvasSize, canvasSize)
    this.ctx.globalAlpha = .3
    this.ctx.font = this.textBase
    this.ctx.fillText("🕑", -6, 42)

    const size = 20
    const cx = canvasSize - size
    const cy = canvasSize - size
    const pauseLineWidth = size * .25
    const pauseLineHeight = size

    this.ctx.globalAlpha = 1.0
    this.ctx.fillStyle = this.gradient
    this.ctx.beginPath()
    this.ctx.arc(cx, cy, size, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.fillStyle = this.white
    this.ctx.fillRect(cx - pauseLineWidth * 1.5, cy - pauseLineHeight / 2, pauseLineWidth, pauseLineHeight)
    this.ctx.fillRect(cx + pauseLineWidth * 0.5, cy - pauseLineHeight / 2, pauseLineWidth, pauseLineHeight)

    this.updateFavicon()
  }

  setDoneIcon() {
    this.stopAnimation()

    let opacity = .5
    let opaStep = .05

    this.animationId = setInterval(() => {
      opacity += opaStep
      if (opacity <= .3) {
        opacity = .3
        opaStep = -opaStep
      }
      if (opacity >= 1.0) {
        opacity = 1.0
        opaStep = -opaStep
      }

      this.drawDoneIcon(opacity)
    }, 1000 / this.animationRate)
  }

  private drawDoneIcon(opacity: number) {
    this.ctx.clearRect(0, 0, canvasSize, canvasSize)

    this.ctx.globalAlpha = .3
    this.ctx.font = this.textBase
    this.ctx.fillText("🕑", -6, 42)

    this.ctx.globalAlpha = opacity
    this.ctx.font = this.textSm
    this.ctx.fillText("✅", 20, 58)

    this.updateFavicon()
  }

  private stopAnimation() {
    if (!this.animationId) return
    clearInterval(this.animationId)
    this.animationId = null
  }

  private updateFavicon() {
    this.linkEl.href = this.canvas.toDataURL(this.linkEl.type)
  }
}

export const favicon = new Favicon()
