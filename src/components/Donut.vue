<script setup>
import { onMounted, ref } from 'vue'
import { dot, norm } from 'mathjs'
import { useCanvas } from '../composables/canvas'
import { useDrag } from '../composables/drag'

import VueButton from './VueButton.vue'

function renderDonut(
    A, B, L,
    maxwidth,
    offsetX,
    offsetY,
    dist,
    color,
    config
) {
    const donutPoints = []

    const R1 = config?.R1 ?? 1
    const R2 = config?.R2 ?? 2
    const K2 = config?.K2 ?? 5
    const thetaSpacing = config?.thetaSpacing ?? .2
    const phiSpacing = config?.phiSpacing ?? .07
    const K1 = dist*maxwidth*K2 / (2 *(R1 + R2))

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
            const z = K2 + circleX*cosA*sinPhi + circleY*sinA

            const xp = Math.floor(offsetX + K1*x/z)
            const yp = Math.floor(offsetY - K1*y/z)

            const n = [
                cosTheta*(cosB*cosPhi + sinTheta*sinB*sinPhi) - cosA*sinB*sinTheta,
                cosTheta*(cosPhi*sinB - cosB*sinA*sinPhi) + cosA*cosB*sinTheta,
                cosA*cosTheta*sinPhi + sinA*sinTheta
            ]
            
            const light = dot(n, L)/norm(L)
            if (light > 0) donutPoints.push([xp, yp, color, light])
        }
    }

    return donutPoints
}

let A = -1; let B = 0
let light = [-1, 0, -1]
const distance = ref(.8)
const color = ref('white')
const animating = ref(false)

const canvas = ref(null)
const { runAnimation, plotPoints } = useCanvas(canvas)

function rotate(pull) {
    B += pull.dx / 100
    A -= pull.dy / 100
}

function update() {
    const donutPoints = renderDonut(A, B, light, 300, 200, 200, distance.value, color.value)
    plotPoints(donutPoints)

    if (!animating.value) return
    A = (A - .01) % 314
    B = (B + .02) % 314
}

useDrag(canvas, rotate)
onMounted(() => runAnimation(update))
</script>

<template>

    <div class="donut">

        <div class="controls">
            <h2> The Parameters </h2>

            <div class="row">
                <label> Distance </label>
                <input type="range" min="0.2" max="1" step="0.01" v-model="distance">
            </div>

            <div class="row">
                <label for=""> Light x </label>
                <input type="range" min="-2" max="2" step="0.01" v-model="light[0]">
            </div>

            <div class="row">
                <label for=""> Light y </label>
                <input type="range" min="-2" max="2" step="0.01" v-model="light[1]">
            </div>

            <VueButton 
                label="Spin"
                @click="animating = !animating"
            />
        </div>

        <canvas
            ref="canvas"
            width="400" 
            height="400" 
        >
        </canvas>
    </div>


</template>

<style scoped>
.donut {
    display: flex;
    gap: 40px;
}

h2 {
    margin-bottom: 5px;
}

.controls {
    display: flex;
    flex-direction: column;
    gap: 25px;
    background-color: #252529;
    border-radius: 8px;
    padding: 20px;
    width: 300px;

}

.button {
    width: 50%;
    margin-top: 20px;
}

.row {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 80%;
}

</style>
