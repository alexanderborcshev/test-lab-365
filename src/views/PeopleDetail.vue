<script setup lang="ts">
    import { usePeopleStore } from "@/stores/people";
    import { useRoute } from 'vue-router'
    const peopleStore = usePeopleStore();
    const route = useRoute();
    peopleStore.getDetail(+route.params.id);
</script>

<template>
    <table class="mt-4" border="1" cellspacing="0">
        <thead class="bg-bluegray-200">
            <tr>
                <td class="p-2">Field</td>
                <td class="p-2">Value</td>
            </tr>
        </thead>

        <tr v-for="(filed, index) in peopleStore.detail" :key="index">
            <td class="p-2">{{ index }}</td>
            <td class="p-2">{{ filed }}</td>
        </tr>
    </table>
</template>

<style scoped>

</style>