<script setup>
import { ref } from 'vue'
import { useRender } from './composables/render'

import Obj from './components/Object.vue'

const render = useRender([0, 0], [1, 0, -1], .7, 300, 200, 200, 'white')
const { renderedPoints, renderCube, renderDonut } = render

const rot = [0, 0]
const animating = ref(true)
const isDonut = ref(true)

function onUpdate() {
  isDonut.value ? renderDonut() : renderCube()

  if (!animating.value) return
  rot[0] = (rot[0] - .03) % 314
  rot[1] = (rot[1] + .02) % 314
  render.rotate(rot)
}


</script>

<template>

  <Obj
    :rot="rot"
    :points="renderedPoints"
    @update="onUpdate"
  />

</template>

<style scoped>
h1 {
  margin-bottom: 10px;
}

.container {
  align-items: center;
  display: flex;
  gap: 30px;
  padding: 50px 0;
}

.button {
  height: 40px;
  background-color: #2b2b2e;
}

.links {
  display: inline-flex;
  gap: 10px;
}
</style>
