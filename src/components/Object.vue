<script setup>
import { onMounted, ref } from 'vue'
import { useCanvas } from '../composables/canvas'
import { useDrag } from '../composables/drag'

const props = defineProps(['points', 'rot'])
const emit = defineEmits(['update', 'rotate'])

const canvas = ref(null)
const { runAnimation, plotPoints } = useCanvas(canvas)

function rotate(pull) {
    B += pull.dx / 100
    A -= pull.dy / 100

    emit('rotate', pull.dx, pull.dy)
}

function update() {
    plotPoints(props.points)
    emit('update')
}

useDrag(canvas, rotate)
onMounted(() => runAnimation(update))
</script>

<template>

    <canvas
        ref="canvas"
        width="400" 
        height="400" 
    />

</template>