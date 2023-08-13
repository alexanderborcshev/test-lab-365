<script lang="ts" setup>

export interface Props {
    item?: Item
}

interface Item {
    label: string
    path: string
}

const props = withDefaults(defineProps<Props>(), {
    item: () => {
       return {
           label: '',
           path: '',
       }
    },
})
</script>

<template>
    <router-link class="flex bg-primary hover:bg-cyan-700 border-round font-bold m-2 flex align-items-center justify-content-center p-2" :to="props.item.path">{{ props.item.label }}</router-link>
</template>

<style scoped>

</style>