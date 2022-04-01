<template>
  <div>
    <p class="title">{{title}}</p>
    <Button label="button" :primary="true" size="small"></Button>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import Button from './components/Button.vue';

export default defineComponent({
  components: {
    Button
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
