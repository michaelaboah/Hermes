<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue";
    import Frame from "../Video/Frame.vue"
    import Chat from "./Chat.vue";

    type Participant = {
        username: string,
        camStream: MediaStream,
        isHost: boolean,
        
    }

    const videoElement = ref<HTMLVideoElement | null>(null);
    const stunServers = ref<RTCConfiguration>({
        iceServers: [
            { 
                urls: [
                    "stun:stun.plexicomm.net:3478",
                ]
            }
        ]
    })

    
    let localStream = ref<MediaStream>()



    const participants = reactive([

    ])

    async function init(){
        try {
            localStream.value = await navigator.mediaDevices.getUserMedia({video: true, audio: false})     
            console.log(localStream.value)      
        } catch (error) {
            console.error(error)
        }
    }

    onMounted( () => {
        init().then(() => {
            if (localStream.value) {
                videoElement.value!.srcObject = localStream.value
            }
        })
    })



</script>

<template>
    <div class="container flex items-center gap-3">
        <!-- <div  :key="index" v-for="(p, index) in participants"> -->
            <Frame v-if="localStream" :stream="localStream"/>
        <!-- </div> -->

        <Chat/>
    </div>
</template>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 2em
    }
</style>