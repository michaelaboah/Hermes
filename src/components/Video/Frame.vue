<script setup lang="ts">
    import {  onMounted, ref } from 'vue';

    const props = defineProps({
        stream: {
            type: MediaStream,
            required: true
        }
    })

    let videoElement = ref<HTMLVideoElement | null>(null)

    onMounted(() => {
        if (props.stream) {
            console.log(props.stream)
            videoElement.value!.srcObject = props.stream
        }
    })
    
</script>

<template>
    <div class="h-full">
        <video  @pause.prevent
                @mouseenter.stop
                @mouseenter.prevent
             class="object-none" ref="videoElement" preload="none"  autoplay playsinline="true"/>
    </div>
</template>

<style scoped>
    /* video::-webkit-media-controls-start-playback-button {
        display: none;
    } */
</style>