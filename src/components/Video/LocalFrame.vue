<script setup lang="ts">
    import {  onMounted, ref } from 'vue';

    const props = defineProps({
        stream: {
            type: MediaStream,
            required: true
        }
    })

    const emits = defineEmits(['toggleAudio', 'toggleCamera'])

    let videoElement = ref<HTMLVideoElement | null>(null)

    onMounted(() => {
        if (props.stream) {            
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