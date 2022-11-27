<template>
  <div v-if="tosts.length" class="toasts">
    <ui-tost-list :tosts="tosts" @delete="removeTost"></ui-tost-list>
  </div>
</template>

<script>
import UiTostList from './UiTostList.vue';

export default {
  name: 'TheToaster',
  components: {
    UiTostList
  },

  data() {
    return {
      id: 1,
      tosts: []
    }
  },

  methods: {
    error(message, time = 5000) {
      let tost = {
        id: ++this.id,
        msg: message,
        class: 'toast_error',
        icon: 'alert-circle'
      }
      this.addTost(tost, time)
    },
    success(message, time = 5000) {
      let tost = {
        id: ++this.id,
        msg: message,
        class: 'toast_success',
        icon: 'check-circle'
      }
      this.addTost(tost, time)
    },
    addTost(tost, time) {
      this.tosts.push(tost)
      let addedTost = this.tosts[this.tosts.length - 1]
      setTimeout(() => {
        this.tosts = this.tosts.filter(item => item != addedTost)
      }, time)
    },
    removeTost(tost) {
      this.tosts = this.tosts.filter(item => item != tost)
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
