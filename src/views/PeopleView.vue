<script setup lang="ts">
    import PeopleTable from "@/components/PeopleTable.vue";
    import { usePeopleStore } from "@/stores/people";
    const peopleStore = usePeopleStore();
</script>

<template>
    <PeopleTable :people="peopleStore.peopleList"></PeopleTable>
</template>

<style scoped>

</style>