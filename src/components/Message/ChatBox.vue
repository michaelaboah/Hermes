<template>
    <div class="px-4 mb-4">
        <!-- <div class="absolute inset-y-0 left-0 flex items-center">
            <IcSendDiagonal/>
        </div> -->
        <textarea v-model="message" class="w-56 rounded px-2 py-3 text-sm bg-gray-800 text-gray-400 placeholder-gray-500 font-light scrollbar-hide" type="text" placeholder="Message ..."/>
        <button @click="sendMessage">
            <IcSendDiagonal/>
        </button>
    </div>
</template>

<script setup lang="ts">
    //@ts-expect-error
    import { IcSendDiagonal } from "@kalimahapps/vue-icons/ic";
    import { ref, defineEmits } from 'vue';

    const message = ref('');
    const emits = defineEmits(['send-message']);


    function sendMessage() {
        emits('send-message', message.value)
        message.value = ''
    }
</script>
