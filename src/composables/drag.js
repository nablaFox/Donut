import { onMounted, ref } from 'vue'

export function useDrag(target, onDrag) {
    const dragging = ref(false)
    const dx = ref(0)
    const dy = ref(0)

    onMounted(() => {
        let lastX, lastY

        document.addEventListener('mousemove', e => {
            if (!dragging.value) return
            dx.value = e.clientX - lastX
            dy.value = e.clientY - lastY
            lastX = e.clientX
            lastY = e.clientY
            
            onDrag({
                dx: dx.value,
                dy: dy.value,
                x: e.clientX,
                y: e.clientY
            })
        })

        document.addEventListener('mouseup', () => (dragging.value = false))
        
        target.value.addEventListener('mousedown', e => { 
            dragging.value = true
            lastX = e.clientX
            lastY = e.clientY
        })
    })

    return { 
        dragging,
        dx,
        dy
    }
}