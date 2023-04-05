<script setup>
import tinycolor from 'tinycolor2'
import { ref } from 'vue'
import { useDrag } from '../composables/drag'

const props = defineProps({
    color: String
})

const emit = defineEmits(['update:color'])

const handle = ref(null)
const track = ref(null)

const getColor = degree => tinycolor(`hsl(${degree}, 100%, 50%)`).toHexString()

function moveSlider(pull) {
    const trackRect = track.value.getBoundingClientRect()
    let offset

    if (pull.x > trackRect.right) offset = trackRect.right - 48
    else if (pull.x < trackRect.left + 24) offset = 0
    else offset = pull.x - 48

    const degree = Math.floor(offset * 360 / (trackRect.right - 48))
    const color = getColor(degree)

    handle.value.style.left = `${offset}px`
    emit('update:color', color)
}

useDrag(handle, moveSlider)
</script>

<template>

    <div class="slider">
        <div class="track" ref="track"></div>
        <div
            ref="handle"
            class="handle"
            :style="{ backgroundColor: color }"
        />
    </div>

</template>

<style>
.slider {
    display: inline-flex;
    align-items: center;
}

.track {
    background: linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%));
    width: 586px;
    height: 8px;
    border-radius: 8px;
}

.handle {
    width: 24px;
    aspect-ratio: 1;
    border-radius: 100%;
    box-sizing: content-box;
    border: 2px solid white;
    cursor: pointer;
    position: absolute;
    will-change: left;
    left: 0px;
}
</style>