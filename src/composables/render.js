import { ref } from 'vue'
import { dot, norm } from 'mathjs'

export function useRender(
    rot, 
    light, 
    distance, 
    maxwidth, 
    offsetX, 
    offsetY, 
    color
) {
    const renderedPoints = ref([])
    const A = ref(rot[0])
    const B = ref(rot[1])
    const dist = ref(distance)
    let L = light
    
    function renderDonut(config) {
        const donutPoints = []

        const R1 = config?.R1 ?? 1
        const R2 = config?.R2 ?? 2
        const K2 = config?.K2 ?? 5
        const K1 = dist.value*maxwidth*K2 / (2 *(R1 + R2))
        const thetaSpacing = config?.theta ?? .2
        const phiSpacing = config?.phi ?? .07

        const sinA = Math.sin(A.value); const sinB = Math.sin(B.value)
        const cosA = Math.cos(A.value); const cosB = Math.cos(B.value)

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

        renderedPoints.value = donutPoints
    }

    function renderCube(config) {

    }

    const updateLight = (l, i) => (L.value[i] = l)
    const updateDist = dist => (distance.value = dist)

    function rotate(rot) {
        A.value = rot[0]
        B.value = rot[1]
    }

    return {
        renderDonut,
        renderCube,
        updateLight,
        updateDist,
        rotate,
        renderedPoints
    }

}