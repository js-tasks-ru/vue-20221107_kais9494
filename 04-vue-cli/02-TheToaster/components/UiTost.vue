<template>
    <div :class="tost.class" class="toast">
        <ui-icon class="toast__icon" :icon="tost.icon" />
        <span>{{ tost.msg }}</span>
        <span @click="$emit('delete', tost)"> x</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
    name: 'UiTost',
    components: {
        UiIcon

    },
    emits: ['delete'],
    props: {
        tost: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
}

.toast+.toast {
    margin-top: 20px;
}

.toast__icon {
    margin-right: 12px;
}

.toast.toast_success {
    color: var(--green);
}

.toast.toast_error {
    color: var(--red);
}
</style>