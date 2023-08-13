<script lang="ts" setup>
import {ref} from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import PeopleService from "@/service/PeopleService";
import {usePeopleStore} from "@/stores/people";

const query = ref('');
const loading = ref(false);
const items = ref(false);
const peopleStore = usePeopleStore();

const load = () => {
    loading.value = true;
    items.value = [];
    if (query.value) {
        PeopleService.search(query.value).then((data) => {
            loading.value = false;
            items.value = data.results;
        });
    } else {
        loading.value = false;
    }

};
function goDetail (id) {
    items.value = [];
    const peopleStore = usePeopleStore();
    peopleStore.getDetail(+id);
}
</script>

<template>
    <div class="m-2" style="position: relative">
        <span class="p-input-icon-left mr-2">
            <i class="pi pi-search" />
            <InputText v-model="query" placeholder="Search" />
        </span>
        <Button type="button" label="" icon="pi pi-search" :loading="loading" @click="load" />
        <div class="bg-gray-200 shadow-2 search-result">
            <div v-for="(item,index) in items" :key="index" class="p-2">
                <router-link @click="goDetail(peopleStore.getId(item.url))" :to="`/people/${peopleStore.getId(item.url)}`">{{item.name}}</router-link>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .search-result {
        position: absolute;
        top: 43px;
        width: 100%;
        z-index: 1;
    }
</style>