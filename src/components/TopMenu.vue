<script lang="ts" setup>
import TopMenuItem from '@/components/TopMenuItem.vue'
import SearchPeople from '@/components/SearchPeople.vue'
import { ref } from "vue";
const items = ref([
    { label: 'People', path: '/people' },
    { label: 'Favorites', path: '/favorites' }
]);
</script>

<template>
    <div class="flex flex-row flex-wrap bg-black-alpha-30">
        <TopMenuItem v-for="(item, index) in items" :item="item" :key="index"></TopMenuItem>
        <div class="flex-grow-1 flex-shrink-1 flex"></div>
        <SearchPeople></SearchPeople>
    </div>

</template>

<style scoped>

</style>