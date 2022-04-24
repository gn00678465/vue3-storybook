import { ref, unref, computed, watch } from 'vue';

export function usePromise(promise, pendingDelay) {
  const isResolved =ref(false);
  const isRejected =  ref(false);
  const isPending = computed(() => !isResolved.value && !isRejected.value);
  const isDelayElapsed = ref(false);
  let timeId;

  const error = ref();
  const data = ref();

  watch(
    () => unref(promise),
    (newPromise) => {
      isResolved.value = false;
      isRejected.value = false;
      error.value = null;

      if(!newPromise) {
        data.value = null;
        if (timeId) clearTimeout(timeId);
        timeId = null;
        return;
      }

      if(unref(pendingDelay) > 0) {
        isDelayElapsed.value = false;
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => {
          isDelayElapsed.value = true;
        }, Number(unref(pendingDelay)))
      }
      else {
        isDelayElapsed.value = true;
      }

      newPromise
        .then((newData) => {
          if (unref(promise) === newPromise) {
            data.value = newData;
            isResolved.value = true;
          }
        })
        .catch((err) => {
          if(unref(promise) === newPromise) {
            error.value = err;
            isRejected.value = true;
          }
        })
    },
    { immediate: true }
  );

  return { isResolved, isRejected, isPending, isDelayElapsed, error, data };
}
