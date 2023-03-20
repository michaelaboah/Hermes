<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue";
    import RemoteFrame from "../Video/RemoteFrame.vue"
    import LocalFrame from "../Video/LocalFrame.vue"
    import Chat from "./Chat.vue";

    type Participant = {
        username: string,
        camStream: MediaStream | undefined,
        isHost: boolean,
        isLocal: boolean
    }
    // const videoElement = ref<HTMLVideoElement | null>(null);
    const stunServers = ref<RTCConfiguration>({
        iceServers: [
            { 
                urls: [
                    "stun:stun.plexicomm.net:3478",
                    "stun:stun.l.google.com:19302",
                    // "stun:stun1.l.google.com:19302",
                    // "stun:stun2.l.google.com:19302",
                    // "stun:stun3.l.google.com:19302",
                    // "stun:stun4.l.google.com:19302",
                ]
            }
        ]
    })

    const participants = reactive<Participant[]>([
        {
            username: "Michael Aboah",
            camStream: undefined,
            isHost: true,
            isLocal: true
        }
    ])

    let localStream = ref<MediaStream>()
    let remoteStream = ref<MediaStream>()
    let peerConnection: RTCPeerConnection;

    async function createOffer() {
        peerConnection = new RTCPeerConnection({...stunServers.value})
        localStream.value?.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream.value!)
        })

        peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.value?.addTrack(track)
            })
        }

        remoteStream.value = new MediaStream()

        // try {
        //     videoElement.value!.srcObject = remoteStream.value            
        // } catch (error) {
        //     // console.error(error)
        //     console.log("Is pending")
        // }

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                console.log("New Ice candiate", event.candidate)
            }
        }

        let offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        console.log("Offer:", offer)
    }



    async function init(){
        try {
            localStream.value = await navigator.mediaDevices.getUserMedia({video: true, audio: false})     
            console.log(localStream.value)
            createOffer()      
        } catch (error) {
            console.error(error)
        }
    }

    onMounted( () => {
        init().then(() => {
            try {                
                // if (localStream.value) {
                //     videoElement.value!.srcObject = localStream.value
                // } else {
                //     console.log("Is pending")    
                // }
            } catch (error) {
                console.log("Is pending")
            }
        })
    })


</script>

<template>
    <div class="">
        <div class="flex grow items-center gap-3">
            <LocalFrame v-if="localStream" :stream="localStream"/>
            <!-- <div  :key="index" v-for="(p, index) in participants"> -->
            <RemoteFrame v-if="remoteStream" :stream="remoteStream"/>
            <!-- </div> -->
    
        </div>
        <Chat/>
    </div>
</template>

<style scoped>
    /* .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 2em
    } */
</style>