<script setup lang="ts">
    import { ref } from "vue";
    import RemoteFrame from "../Video/RemoteFrame.vue";
    import UserFrame from "../Video/UserFrame.vue";
    import Chat from "./Chat.vue";

    const participants = ref([1, 2]);
    const stunServers = {
        iceServers: [
            { 
                urls: [
                    "stun.l.google.com:19302",
                    "stun1.l.google.com:19302",
                    "stun2.l.google.com:19302",
                    "stun3.l.google.com:19302",
                    "stun4.l.google.com:19302",
                ]
            }
        ]
    }





</script>

<template>
    <div class="container flex items-center gap-3">
        <!-- <div  :key="index" v-for="(p, index) in participants"> -->
            <UserFrame/>
            <RemoteFrame/>
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