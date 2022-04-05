<script>
import { h, watch, computed, onMounted } from 'vue';
import { eventBus } from '@/utils/emitter.js';

export default {
  name: 'Collapse',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    activeClass: {
      type: String,
      default: 'collapse-panel-active'
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  setup(context, { slots, emit, expose }) {

    const handlePanelOpen = (key) => {
      let newArr = [];
      if(context.accordion) {
        newArr = [key];
      }
      else {
        newArr = [ ...context.value, key ];
      }
      emit('input', newArr);
      emit('change', newArr, context.value);
    };

    const handlePanelClose = (key) => {
      const tmp = [];
      context.value.forEach((item) => {
        if (item !== key) { tmp.push(key); }
      });
      emit('input', tmp);
      emit('change', tmp, context.value);
    };

    watch(
      () => context.value,
      (newVal) => {
        if (context.accordion && newVal.length > 1) {
          emit('input', [newVal[0]]);
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      eventBus.$on('collapse.open', handlePanelOpen);
      eventBus.$on('collapse.close', handlePanelClose);
    });

    expose({
      activeClass: computed(() => context.activeClass),
      value: computed(() => context.value)
    });

    return () => h('div', {}, slots.default && slots.default());
  }
};
</script>
