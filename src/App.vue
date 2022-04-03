<template>
  <div>
    <p class="title">{{title}}</p>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
  },
  setup() {
    const title = ref('Vue.js');

    return {
      title
    };
  }
});
</script>
<style scoped>
.title{
    color: #000;
}
</style>
