<template>
    <ui-tost v-for="tost in tosts" :key="tost.id" :tost="tost" @delete="$emit('delete', $event)" />
</template>
<script>
import UiTost from './UiTost.vue';
export default {
    name: 'UiTostList',
    components: {
        UiTost
    },
    emits: ['delete'],
    props: {
        tosts: {
            type: Array,
            required: true
        }
    }
}
</script>

