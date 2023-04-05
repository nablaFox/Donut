<script setup>
import Donut from './components/Donut.vue'
import VueButton from './components/VueButton.vue'
</script>

<template>

  <div class="container">
    <Donut />
    <div class="left">
      <h1> A spinning Donut! </h1>

      <div class="links">
        <VueButton label="See the math" />
        <VueButton label="See the cube" />
      </div>
    </div>
  </div>

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
