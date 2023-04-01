const R1 = 1
const R2 = 2
const K2 = 5
const K1 = (canvas.width * 3 * K2) / (8 * (R1 + R2)) 
// with z = 0 the donut is 3/4th of the way from the center to the side of the screen

const thetaSpacing = 0.1
const phiSpacing = 0.07

let A = 0
let B = 0

const donutPoints = []

function computeLight(
    cosTheta, 
    sinTheta, 
    cosPhi, 
    sinPhi, 
    cosA, 
    sinA,
    cosB,
    sinB
) {
    const result = cosPhi*cosTheta*sinB - cosA*cosTheta*sinPhi
    - sinA*sinTheta + cosB*(cosA*sinTheta - cosTheta*sinA*sinPhi)

    return result / Math.sqrt(2)
}

function renderFrame(deltaA, deltaB) {
    A = (A + deltaA) % 360
    B = (B + deltaB) % 360

    const sinA = Math.sin(A); const sinB = Math.sin(B)
    const cosA = Math.cos(A); const cosB = Math.cos(B)
    
    for (let theta = 0; theta < 2 * Math.PI; theta += thetaSpacing) {
        const sinTheta = Math.sin(theta) 
        const cosTheta = Math.cos(theta)

        for (let phi = 0; phi < 2 * Math.PI; phi += phiSpacing) {
            const sinPhi = Math.sin(phi) 
            const cosPhi = Math.cos(phi)

            const circleX = R2 + R1 * cosTheta
            const circleY = R1 * sinTheta

            const x = circleX * (cosB*cosPhi + sinA*sinB*sinPhi) - circleY*cosA*sinB
            const y = circleX * (cosPhi*sinB - cosB*sinA*sinPhi) + circleY*cosA*cosB
            const z = circleX * (cosA*sinPhi) + circleY*sinA 

            const xp = ((K1 * x) / (K2 + z)) + canvas.width / 2
            const yp = ((K1 * y) / (K2 + z)) + canvas.height / 2

            const light = computeLight(
                cosTheta, 
                sinTheta, 
                cosPhi, 
                sinPhi, 
                cosA, 
                sinA,
                cosB,
                sinB
            )

            if (light > 0) donutPoints.push([xp, yp, light])
        }
    }
}

function draw(ctx) {
    donutPoints.forEach(point => {
        const [x, y, light ] = point
        ctx.drawPixel(x, y, light)
    })
}

function update(ctx) {
    renderFrame(0.025, -.01)
    draw(ctx)
    donutPoints.length = 0
}

runAnimation(update)