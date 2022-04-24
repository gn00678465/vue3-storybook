<script>
import { defineComponent, h, reactive, toRefs } from 'vue';
import { usePromise } from './usePromise';

export default defineComponent({
  name: 'Promised',
  props: {
    promise: {
      type: Promise,
      default: null
    },
    pendingDelay: {
      type: [Number, String],
      default: 200,
    },
    resolveFn: {
      type: Function,
      default: null
    },
    rejectFn: {
      type: Function,
      default: null
    }
  },
  setup(props, { slots }) {
    const propsAsRefs = toRefs(props);
    const promiseState = reactive(
      usePromise(
        propsAsRefs.promise,
        propsAsRefs.pendingDelay
      )
    );

    return () => {
      if ('combined' in slots) {
        return slots.combined(promiseState)
      }
      const [slotName, slotData] = promiseState.isRejected
        ? ['rejected', promiseState.error]
        : !promiseState.isPending
          ? ['default', promiseState.data]
          : promiseState.isDelayElapsed
            ? ['pending', promiseState.data]
            : [null]

      return slotName && slots[slotName](slotData);
    }
  }
})
</script>
