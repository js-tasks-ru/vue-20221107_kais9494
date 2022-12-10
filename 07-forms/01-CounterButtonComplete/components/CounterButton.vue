<template>
  <button @click="onClick()">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  emits: ['update:count'],
  data() {
    return {
      localCount: 0,
    }
  },
  created() {
    this.updateLocalCount()
  },
  watch: {
    count(newVal, oldVal) {
      if (this.localCount != this.count) {
        this.updateLocalCount()
      }
    }
  },
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    onClick() {
      this.localCount++;
      this.$emit('update:count', this.localCount)
    },
    updateLocalCount() {
      this.localCount = this.count
    }
  }
};
</script>
