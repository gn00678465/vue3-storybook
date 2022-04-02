import TypingTextAnimation from '../components/TypingTextAnimation/TypingTextAnimation.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Other/TypingTextAnimation',
  component: TypingTextAnimation,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    color: { control: 'color' },
    cursorColor: { control: 'color' },
    duration: {
      name: 'duration',
      type: 'number',
      defaultValue: 200
    },
    changeDuration: {
      name: 'changeDuration',
      type: 'number',
      defaultValue: 2000
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { TypingTextAnimation },
  setup() {
    return { args };
  },
  template: `
  <TypingTextAnimation v-bind="args">
  </TypingTextAnimation>
  `,
});

export const Single = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Single.args = {
  text: 'Primary',
};

export const Multiple = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Multiple.args = {
  text: ['Single', 'Multiple'],
};
