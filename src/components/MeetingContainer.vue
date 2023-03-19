<script setup lang="ts">
    import { ref } from "vue";
    import VideoFrame from "./VideoFrame.vue";

    const participants = ref([1, 2]);
</script>

<template>
    <div class="container">
        <!-- <div  :key="index" v-for="(p, index) in participants"> -->
            <VideoFrame/>
        <!-- </div> -->
    </div>
</template>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 2em
    }
</style>