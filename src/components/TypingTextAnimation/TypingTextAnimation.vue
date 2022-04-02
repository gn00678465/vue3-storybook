<script>
import './style.scss';
import { h, computed, defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'TypingTextAnimation',
  props: {
    text: {
      type: [String, Array],
      default: 'Typing Text'
    },
    color: {
      type: String,
      default: '#dd7732'
    },
    cursorColor: {
      type: String,
      default: '#ccc'
    },
    font: {
      type: String
    },
    duration: {
      type: Number,
      validator: function (value) {
        return value > 100;
      },
      default: 200
    },
    changeDuration: {
      type: Number,
      default: 2000
    }
  },
  setup(context, ctx) {

    const textArray = computed(() => {
      if (typeof context.text === 'string') return [context.text];
      return context.text;
    });

    const styles = computed(() => ({
      '--color': context.color,
      '--cursorColor': context.cursorColor
    }));

    const textArrayIndex = ref(0);
    const charIndex = ref(0);
    const isTyping = ref(true);
    const textContent = ref('');

    function type() {
      if(charIndex.value < textArray.value[textArrayIndex.value].length) {
        if(!isTyping.value) isTyping.value = true;
        textContent.value += textArray.value[textArrayIndex.value].charAt(charIndex.value);
        charIndex.value++;
        setTimeout(type, context.duration);
      }
      else {
        isTyping.value = false;
        setTimeout(erase, context.changeDuration);
      }
    }
    function erase() {
      if(charIndex.value > 0) {
        if(!isTyping.value) isTyping.value = true;
        textContent.value = textArray.value[textArrayIndex.value].substring(0, charIndex.value - 1);
        charIndex.value--;
        setTimeout(erase, context.duration);
      }
      else {
        isTyping.value = false;
        textArrayIndex.value++;
        if(textArrayIndex.value >= textArray.value.length) textArrayIndex.value = 0;
        setTimeout(type, context.duration + 1100);
      }
    }

    // hooks
    onMounted(() => {
      if(textArray.value.length) setTimeout(type, context.changeDuration + 250);
    });

    return () => h('div', {
      class: 'typing-wrapper',
      style: styles.value
    }, [
      h('p', {
        class: 'typing-container'
      }, [
        h('span', {
          class: 'typing-text'
        }, textContent.value),
        h('span', {
          class: ['typing-cursor', {
            'typing': isTyping.value
          }],
        }, '|')
      ])
    ]);
  }
});
</script>
