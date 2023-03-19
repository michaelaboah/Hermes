<script setup lang="ts">
    import { ref } from "vue";
    import { StunServers } from "../../@types/RTCComponents"
    import RemoteFrame from "../Video/RemoteFrame.vue";
    import UserFrame from "../Video/UserFrame.vue";
    import Chat from "./Chat.vue";

    const participants = ref([1, 2]);
    const stunServers = ref<RTCConfiguration>({
            iceServers: [
                { 
                    urls: [
                        "stun:stun.plexicomm.net:3478",
                    ]
                }
            ]
    })





</script>

<template>
    <div class="container flex items-center gap-3">
        <!-- <div  :key="index" v-for="(p, index) in participants"> -->
            <UserFrame/>
            <RemoteFrame :configuration="stunServers"/>
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