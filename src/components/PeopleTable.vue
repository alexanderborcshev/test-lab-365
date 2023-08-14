<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import type Person from "@/types/Person";
import { usePeopleStore } from "@/stores/people";

export interface Props {
    people?: Person[]
}

withDefaults(defineProps<Props>(), {
    people: () => {
        return [] as Person[]
    },
})

const peopleStore = usePeopleStore();


</script>

<template>
    <div class="flex flex-row flex-wrap justify-content-center mt-4">
        <DataTable :value="people" tableStyle="min-width: 100rem">
            <Column field="name" header="Name">
                <template #body="slotProps">
                    <router-link :to="`people/${slotProps.data.id}`">{{slotProps.data.name}}</router-link>
                </template>
            </Column>
            <Column field="height" header="Height"></Column>
            <Column field="mass" header="Mass"></Column>
            <Column field="hair_color" header="Hair Color"></Column>
            <Column header="Action">
                <template #body="slotProps">
                    <div class="flex flex-column">
                        <Button @click="peopleStore.toggleFavoriteDetail(slotProps.data)" style="width: 300px" :label="slotProps.data.favorite ? 'удалить из избранное' : 'добавить в избранное'" class="mb-2"/>
                        <Button @click="peopleStore.toggleLocalStorageDetail(slotProps.data)" style="width: 300px" :label="slotProps.data.inLocal ? 'удалить из localStorage' : 'добавить в localStorage'" />
                    </div>

                </template>
            </Column>
        </DataTable>
    </div>

</template>

<style scoped>

</style>