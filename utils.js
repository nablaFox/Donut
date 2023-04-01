const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const getBrightness = light => '#' + Math.floor(light * 255)
    .toString(16)
    .padStart(2, '0')
    .repeat(3)

ctx.drawPixel = function (x, y, light) {
    ctx.fillStyle = getBrightness(light)
    this.fillRect(
        Math.round(x),
        Math.round(y),
        1, 1
    )
}

ctx.clear = async function () {
    this.clearRect(
        0, 0,
        canvas.width,
        canvas.height
    )
}

function runAnimation(callback) {
    ctx.clear()

    window.requestAnimationFrame(() => {
        runAnimation(callback)
    })
    callback(ctx)
}
