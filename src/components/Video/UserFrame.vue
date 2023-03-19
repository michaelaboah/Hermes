<script setup lang="ts">
import {  onMounted, ref } from 'vue';
    let localStream = ref<MediaStream>()
    async function init(){
        try {
            localStream.value = await navigator.mediaDevices.getUserMedia({video: true, audio: false})     
            console.log(localStream.value)      
        } catch (error) {
            console.error(error)
        }

    }
    const videoElement = ref<HTMLVideoElement | null>(null);
    onMounted(async () => {
        init().then(() => {
            if (localStream.value) {
                videoElement.value!.srcObject = localStream.value
            }
        })
    })
</script>

<template>
    <div class="">
        <video  @pause.prevent
                @mouseenter.stop
                @mouseenter.prevent
             class="object-none" ref="videoElement" preload="none"  autoplay playsinline="true"/>
    </div>
</template>

<style scoped>
    video::-webkit-media-controls-start-playback-button {
        display: none;
    }
</style>