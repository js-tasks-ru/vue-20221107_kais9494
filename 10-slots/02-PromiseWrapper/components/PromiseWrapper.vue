<template>
  <slot v-if="state == 'rejected'" name="rejected" :error="error"></slot>
  <slot v-else-if="state == 'fulfilled'" name="fulfilled" :result="meetup"></slot>
  <slot v-else name="pending"></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  data() {
    return {
      state: null,
      meetup: null,
      error: null
    }
  },

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  watch: {
    promise: {
      handler() {
        this.meetup = null
        this.error = null
        this.state = 'pending'
        this.promise.then(data => {
          this.state = 'fulfilled'
          this.meetup = data
        }).catch(err => {
          this.state = 'rejected'
          this.error = err
        })
      },
      immediate: true
    }
  },

};
</script>
