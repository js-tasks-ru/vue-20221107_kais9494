<script>
import { compile, h, defineComponent, render } from 'vue';




export default defineComponent({
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
  computed: {

    transComponent() {
      return defineComponent({
        name: "transComponent",
        components: this.components,
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          }
        },
        render: compile(this.$props.template)

      })
    }
  },

  // created() {
  //   Array.from(this.$props.components).forEach(el => {
  //     this.transComponent.component(el.name, el)
  //   })
  // },

  render() {
    return h(this.transComponent, { bindings: this.bindings })
  }

});

</script>
