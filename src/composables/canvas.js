import { onMounted, ref } from 'vue'
import tinycolor from "tinycolor2"

export function useCanvas(canvas) {
    const ctx = ref(null)
    onMounted(() => (ctx.value = canvas.value.getContext("2d")))

    const drawPixel = (x, y, color, light) => {
        ctx.value.fillStyle = tinycolor(color).setAlpha(light)
        ctx.value.fillRect(
            Math.round(x),
            Math.round(y),
            2, 2
        )
    }

    const plotPoints = points => {
       points.forEach((point) => drawPixel(...point))
    }

    const clear = () => {
        ctx.value.clearRect(
            0, 0,
            canvas.value.width,
            canvas.value.height
        )
    }

    const runAnimation = callback => {
        clear()

        window.requestAnimationFrame(() => {
            runAnimation(callback)
        })
        callback()
    }

    return { 
        ctx,
        drawPixel,
        clear,
        runAnimation,
        plotPoints
    }
}