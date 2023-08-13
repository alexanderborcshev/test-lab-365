<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopMenu from '@/components/TopMenu.vue'
import { usePeopleStore } from "@/stores/people";
import { onMounted } from "vue";
onMounted(() => {
    const peopleStore = usePeopleStore();
    peopleStore.getAll(null);
});
</script>

<template>
    <header>
        <TopMenu></TopMenu>
    </header>
    <RouterView/>
</template>

