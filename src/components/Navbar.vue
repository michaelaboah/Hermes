<template>
    <div v-if="!collapsed" class="w-64 h-screen bg-gray-900 rounded-md">
        <div class="flex flex-col h-screen">
            <div class="px-6 pt-8">
                <div class="flex items-center justify-between">
                    <!-- Add a Vue Router later if necessary -->
                    <a class="bg-blue-600 p-1.5 rounded-md flex items-center justify-center scale-125">
                        <PhBoldStackSimple/>
                    </a>
                    <button @click="() => collapsed = !collapsed" class="flex items-center justify-center p-0.5 rounded bg-gray-800 scale-125">
                        <BxChevronLeft/>
                    </button>
                </div>
            </div>
            <div class="px-6 pt-4 mt-2">
                <!-- Search Bar -->
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <HiMagnifyingGlass class="text-gray-500"/>
                    </div>
                    <input class="w-full rounded pl-8 pr-4 py-2.5 text-sm bg-gray-800 text-gray-400 placeholder-gray-500 font-bold" type="text" placeholder="Search"/>
                </div>            
            </div>
            
            <!-- Separator -->
            <div class="px-6 pt-4">
                <hr class="border-gray-700"/>
            </div>
            <div class="px-6 pt-4">
                <ul class="flex flex-col space-y-2">
                    <li class="relative text-gray-500 hover:text-white">
                        <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                            <MdOutlinedSpaceDashboard class="scale-125"/>
                        </div>
                        <!-- Route -->
                        <a href="#" class="hover:bg-gray-800 inline-block w-full pr-4 py-2 pl-8 rounded text-md">Dashboard</a>
                    </li>
                    <li class="" @click="subDir = !subDir">
                        <div class="relative text-gray-500 hover:text-white flex justify-between">
                            <div class="flex items-center w-full">
                                <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                                    <ByFolder v-if="subDir" class="scale-125"/>
                                    <ByFolderOpen v-else class="scale-125"/>
                                </div>
                            
                            <!-- Route -->
                            <a href="#" class="hover:bg-gray-800 inline-block w-full pr-4 py-2 pl-8 rounded text-md">Sub Directory</a>
                        </div>
                            <div class="absolute flex items-center inset-y-0 right-0 pl-2 pr-2">
                                <div v-if="subDir">
                                    <BxChevronRight class="scale-150"/>
                                </div>
                                <div v-else>
                                    <BxChevronDown class="scale-150"/>
                                </div>
                            </div>
                        </div>
                        <div v-if="subDir" class="pt-2 pl-4 ">
                            <ul class="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                                <li> <a class="inline-block w-full px-4 py-1 text-sm rounded hover:bg-gray-800 hover:text-white">Thing 1</a></li>
                                <li> <a class="inline-block w-full px-4 py-1 text-sm rounded hover:bg-gray-800 hover:text-white">Thing 2</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="flex-grow"></div>
            <div class="relative  bottom-0 left-0 py-4">
                <!-- Separator -->
                <div class="px-6 pt-4">
                    <hr class="border-gray-700"/>
                </div>
                <div class="px-6 pt-4">
                    <!-- Items -->
                    <ul class="flex flex-col space-y-2">
                        <li class="relative text-gray-500 hover:text-white">
                            <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                                <OcGear class="scale-125"/>
                            </div>
                            <!-- Route -->
                            <a href="#" class="hover:bg-gray-800 inline-block w-full pr-4 py-2 pl-8 rounded text-md">Settings</a>
                        </li>
                        <li class="relative text-gray-500 hover:text-white">
                            <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                                <BsBell class="scale-125"/>
                            </div>
                            <!-- Route -->
                            <a href="#" class="hover:bg-gray-800 inline-block w-full pr-4 py-2 pl-8 rounded text-md">Notifications</a>
                        </li>
                    </ul>
                </div>
                <!-- Hero -->
                <div class="pl-6 pr-4 py-4 mt-6 bg-[#232529] flex items-center justify-between">
                    <div class="flex items-center">
                    <div class="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
                        <img
                            class="rounded-full"
                            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                            alt=""
                        />
                    </div>
                    <div class="flex flex-col pl-3">
                        <div class="text-sm text-gray-50">Jane Doeson</div>
                        <span class="text-xs text-[#acacb0] font-light tracking-tight">
                            janedoeson@gmail.com
                        </span>
                    </div>
                    </div>
                    <button class="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
                        <BxChevronDown/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="w-20 h-screen bg-gray-900 rounded-md">
        <div class="px-6 pt-8">
            <div class="flex items-center justify-between">
                <!-- Add a Vue Router later if necessary -->
                <a class="bg-blue-600 p-1.5 rounded-md flex items-center justify-center scale-125">
                    <PhBoldStackSimple/>
                </a>
                <button @click="() => collapsed = !collapsed" class="flex items-center justify-center p-0.5 ml-2 rounded hover:bg-gray-800 scale-125">
                    <BxChevronRight/>
                </button>
            </div>
        </div>
        <div class="px-6 pt-4 mt-2">
            <!-- Search Bar -->
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 py-2">
                    <HiMagnifyingGlass class="text-gray-500 scale-150"/>
                </div>
                <!-- <input class="w-full rounded pl-8 pr-4 py-2.5 text-sm bg-gray-800 text-gray-400 placeholder-gray-500 font-bold" type="text" placeholder="Search"/> -->
            </div>            
        </div>
        <!-- Separator -->
        <div class="px-6 pt-8">
            <hr class="border-gray-700"/>
        </div>
        <div class="px-6 pt-4">
            <ul class="flex flex-col space-y-10 pt-3">
                <li class="relative text-gray-500 hover:text-white">
                    <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                        <MdOutlinedSpaceDashboard class="scale-125"/>
                    </div>
                </li>
                <li class="" @click="subDir = !subDir">
                    <div class="relative text-gray-500 hover:text-white flex justify-between">
                        <div class="flex items-center w-full">
                            <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                                <ByFolder v-if="subDir" class="scale-125"/>
                                <ByFolderOpen v-else class="scale-125"/>
                            </div>                            
                        </div>
                    </div>
            
                </li>
            </ul>
        </div>
        <div class="absolute bottom-0 left-0 py-4 w-20">
            <!-- Separator -->
            <div class="px-6 pt-4 mb-3">
                <hr class="border-gray-700"/>
            </div>
            <div class="px-6 py-4">
                <!-- Items -->
                <ul class="flex flex-col space-y-8">
                    <li class="relative text-gray-500 hover:text-white py-2">
                        <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                            <OcGear class="scale-125"/>
                        </div>
                    </li>
                    <li class="relative text-gray-500 hover:text-white py-2">
                        <div class="absolute flex items-center inset-y-0 left-0 pl-2">
                            <BsBell class="scale-125"/>
                        </div>
                    </li>
                </ul>
            </div>
                <!-- Hero -->
                <div class="pl-6 py-4 mt-6 bg-[#232529] flex items-center justify-between">
                    <div class="flex items-center">
                    <div class="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
                        <img
                            class="rounded-full"
                            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    //@ts-nocheck
    import { OcGear } from "@kalimahapps/vue-icons/oc";
    import { BsBell } from "@kalimahapps/vue-icons/bs";
    import { PhBoldStackSimple } from "@kalimahapps/vue-icons/ph";
    import { HiMagnifyingGlass } from "@kalimahapps/vue-icons/hi";
    import { MdOutlinedSpaceDashboard } from "@kalimahapps/vue-icons/md";
    import { ByFolder, ByFolderOpen } from "@kalimahapps/vue-icons/by";
    import { BxChevronDown, BxChevronRight, BxChevronLeft } from "@kalimahapps/vue-icons/bx";
    import { ref } from "vue";
    
    let subDir = ref(false)
    let collapsed = ref(false)
</script>
