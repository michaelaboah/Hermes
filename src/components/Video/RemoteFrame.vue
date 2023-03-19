<script setup lang="ts">
    import {  onMounted, ref } from 'vue';

    const videoElement = ref<HTMLVideoElement | null>(null);

    let remoteStream = ref<MediaStream>()
    let peerConnection;



    async function createOffer() {
        peerConnection = new RTCPeerConnection()
        remoteStream.value = new MediaStream()
        videoElement.value!.srcObject = remoteStream.value

        let offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        console.log(offer)
    }

    onMounted(async () => {
        createOffer()
    })
</script>

<template>
    <div class="">
        <video  @pause.prevent
                @mouseenter.stop
                @mouseenter.prevent
             class="object-none bg-black" ref="videoElement" preload="none"  autoplay playsinline="true"/>
    </div>
</template>

<style scoped>
    video::-webkit-media-controls-start-playback-button {
        display: none;
    }

    /* .frame {
        background-color: black;
        width: 100%;
        height: 400px;
        padding: 10px
    }
    video {
    max-width: 100%;
    max-height: 100%; 
    object-fit: contain;
    } */
</style>