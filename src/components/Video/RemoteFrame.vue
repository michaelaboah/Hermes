<script setup lang="ts">
    import {  onMounted, ref } from 'vue';

    const videoElement = ref<HTMLVideoElement | null>(null);

    //This should be of type RTCConfiguration
    const remoteProps: RTCConfiguration = defineProps()

    let remoteStream = ref<MediaStream>()
    let peerConnection: RTCPeerConnection;

    let localStream = ref<MediaStream>()


    async function createOffer() {
        peerConnection = new RTCPeerConnection(remoteProps)        
    
        localStream.value?.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream.value!)
        })

        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.value?.addTrack(track)
            })
        }

        remoteStream.value = new MediaStream()
        videoElement.value!.srcObject = remoteStream.value

        peerConnection.onicecandidate =async (event) => {
            if (event.candidate) {
                console.log("New Ice candiate", event.candidate)
            }
        }


        let offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)

        // console.log(offer)
    }

    onMounted(async () => {
        localStream.value = await navigator.mediaDevices.getUserMedia({video: true})
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