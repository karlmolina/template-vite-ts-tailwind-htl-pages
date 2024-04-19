import p5, { Vector } from 'p5'

function getWindowDimensions(s: Sketch) {
  const ratio = s.windowWidth / s.windowHeight

  let width = s.windowWidth,
    height = s.windowHeight

  const maxDimension = 650
  if (sketchUtils.isTouchDevice) {
    if (height > width) {
      height = maxDimension
      width = height * ratio
    } else {
      width = maxDimension
      height = width / ratio
    }
  }

  return [width, height]
}

function showDebugInfo(s: Sketch, pg: Sketch, maxWidth: number) {
  pg.clear()
  const debugInfo = [
    'fps: ' + Math.round(s.frameRate()),
    'width: ' + s.width,
    'height: ' + s.height,
    'mouseX: ' + Math.round(s.mouseX),
    'mouseY: ' + Math.round(s.mouseY),
  ]

  debugInfo.forEach((info) => {
    const width = pg.textWidth(info)
    if (width > maxWidth) {
      maxWidth = width
    }
  })
  pg.push()
  pg.translate(10, 10)

  pg.rect(0, 0, Math.round(maxWidth) + 10, pg.textSize() * debugInfo.length + 5)

  for (let i = 0; i < debugInfo.length; i++) {
    const info = debugInfo[i]
    pg.text(info, 5, (i + 1) * pg.textSize())
  }

  pg.pop()

  s.image(pg, 0, 0)
}

function getCenter(s: Sketch) {
  return s.createVector(s.width / 2, s.height / 2)
}

export interface Sketch extends p5 {
  updateSketch: () => void
}

const sketchUtils = {
  isTouchDevice: 'ontouchstart' in document.documentElement,
  center: Vector.fromAngle(0),
  minSize: 0,
  wrapSketch: function (wrappedSketchFunction: (s: Sketch) => void) {
    return (s: Sketch) => {
      wrappedSketchFunction(s)

      // Allow us to call updateSketch when it doesn't exist.
      const wrappedUpdateSketch = s.updateSketch
      s.updateSketch = () => {
        sketchUtils.center = getCenter(s)
        sketchUtils.minSize = Math.min(s.width, s.height)

        if (wrappedUpdateSketch) {
          wrappedUpdateSketch()
        }
      }

      const wrappedSetup = s.setup
      s.setup = () => {
        const [width, height] = getWindowDimensions(s)
        s.createCanvas(width, height)

        wrappedSetup()
        s.updateSketch()
      }

      const wrappedWindowResized = s.windowResized
      s.windowResized = () => {
        const [width, height] = getWindowDimensions(s)
        s.resizeCanvas(width, height)

        s.updateSketch()

        if (wrappedWindowResized) {
          wrappedWindowResized()
        }
      }

      const wrappedDraw = s.draw
      s.draw = () => {
        wrappedDraw()
        // showDebugInfo(s, pg, maxWidth);
      }
    }
  },
}

export default sketchUtils
