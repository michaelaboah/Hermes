<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import MeetingContainer from "./components/Meeting/MeetingContainer.vue";
import ToolsContainer from "./components/DevTools/ToolsContainer.vue";
</script>

<template>
  <div class="flex items-center gap-3">
    <Navbar />
    <ToolsContainer />

    <!-- <MeetingContainer/> -->
    <!-- <Greet /> -->
  </div>
</template>
