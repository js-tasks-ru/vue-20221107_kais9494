<template>

  <ui-input :type="type" v-bind="{
    'valueAsNumber': getValueNumber(), ...$attrs
  }" :modelValue="formattedDate" @update:modelValue="onChangeInput($event)">
    <template #left-icon>
      <slot name="left-icon"></slot>
    </template>
    <template #right-icon>
      <slot name="right-icon"></slot>
    </template>
  </ui-input>

</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  components: { UiInput },

  inheritAttrs: false,

  emits: ['update:modelValue'],

  // data() {
  //   return {
  //     formattedDate: ''
  //   }
  // },

  // created() {
  //   this.formattedDate = this.getFormattedDate();
  //   // console.log(this.formattedDate)
  // },



  props: {
    type: {
      type: String,
      default: 'date',
    },

    modelValue: {
      type: Number,
      default: null,
    },

  },
  computed: {
    formattedDate() {
      if (this.modelValue === null) {
        return ''
      }
      if (this.type == 'date') {
        return this.dateObj.toISOString().slice(0, 10)
      } else if (this.type == 'time') {
        return this.dateObj.toISOString().slice(11, 16)
      } else {
        return this.dateObj.toISOString().slice(0, 16)

      }
    },

    dateObj() {
      return new Date(this.modelValue)
    }

  },

  methods: {
    onChangeInput(e) {
      this.$emit('update:modelValue', this.parseDate(e))
    },
    parseDate(e) {
      // console.log(e)
      if (this.type == 'time') {
        let date = new Date(this.modelValue)
        e = e.split(':')
        e[2] = e[2] ? e[2] : '00'
        date.setHours(e[0], e[1], e[2])
        return -date.getTimezoneOffset() * 60000 + Date.parse(date)
      } else if (this.type == 'datetime-local') {
        let ms = Date.parse(e);
        let dateObj = new Date(ms);
        return -dateObj.getTimezoneOffset() * 60000 + ms

      } else {
        return Date.parse(e);
      }

    },
    getValueNumber() {
      if (this.type == 'date') {
        return 'date'
      } else if (this.type == 'time') {
        return 'time'
      } else {
        return NaN
      }
    },
    // getFormattedDate() {

    //   if (this.type == 'date') {
    //     return this.dateObj.toISOString().slice(0, 10)
    //   } else if (this.type == 'time') {
    //     return this.dateObj.toISOString().slice(11, 16)
    //   } else {
    //     return this.dateObj.toISOString().slice(0, 16)

    //   }
    // }
  }

};
</script>
