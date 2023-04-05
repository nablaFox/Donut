<script lang="ts" setup>
defineProps(['label'])
</script>


<template>
    
    <button class="button">
        {{ label }}
    </button>

</template>


<style lang="scss" scoped>
.button {
    border-radius: 12px;
    overflow: hidden;
    height: 30px;
    padding: 0 24px;
    font-size: 16px;
    border: none;
    background-color: #747bff;
    color: white;
    cursor: pointer;
}
</style>