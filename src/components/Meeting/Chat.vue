<template>
    <div v-if="!collapse" class="absolute top-0 right-0 h-screen w-64 bg-gray-900 rounded-md flex flex-col">
        <div class="flex justify-center h-screen">
            <div class="w-60 mt-4">
                <h4 class="py-2 px-6 text-center rounded bg-gray-800" >Chat Messages</h4>
                <!-- Container -->
                <div class="flex-grow rounded mt-2 border border-gray-700">
                    <div class="grow flex-1">
                        <div v-for="(msg, index) in messages" :key="index" class="flex flex-col">
                            <p class="my-2 mx-6">{{ msg }}</p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        <!-- Message Box -->
        <div class="relative bottom-0 right-0 rounded bg-gray-900 flex justify-center">
            <ChatBox v-on:send-message="handleMessage"/>        
        </div>
    </div>

    <div v-else class="absolute top-0 right-0 h-screen w-20 bg-gray-900 rounded">

    </div>
</template>

<script setup lang="ts">
    //@ts-expect-error
    import { IcSendDiagonal } from "@kalimahapps/vue-icons/ic";
    import ChatBox from "../Message/ChatBox.vue";
    import { ref } from 'vue';


    let collapse = ref(false)
    let messages = ref(["Hello ", "How does this react with a very long message?", "Are", "You", "Anoother"])
    
    function handleMessage(msg: string) {
        if (msg.length !== 0) {
            messages.value.push(msg)
        }
    }
</script>