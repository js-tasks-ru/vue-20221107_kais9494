<template>
  <div class="pagination-container">
    <slot v-for="item in itemsPaginated" :item="item"></slot>
  </div>
</template>

<script >
export default {
  name: 'UiPaginationView',

  computed: {
    itemsPaginated() {
      let offset = (this.page - 1) * this.perPage
      return this.items.slice(offset, offset + this.perPage)
    }
  },

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

};
</script>

<style>

</style>
