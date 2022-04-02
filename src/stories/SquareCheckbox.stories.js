import SquareCheckbox from '../components/SquareCheckbox/SquareCheckbox.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Checkbox/SquareCheckbox',
  component: SquareCheckbox,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    borderColor: { control: 'color' },
    onInput: {
      table: {
        category: 'Events',
      },
    },
    onChange: {
      table: {
        category: 'Events',
      },
    },
    value: {
      name: 'value',
      type: { name: ['string', 'number', 'boolean'] },
      defaultValue: false
    },
    trueValue: {
      name: 'trueValue',
      type: { name: ['string', 'number', 'boolean'] },
      defaultValue: true
    },
    falseValue: {
      name: 'trueValue',
      type: { name: ['string', 'number', 'boolean'] },
      defaultValue: false
    },
    disabled: {
      name: 'disabled',
      type: 'boolean',
      control: 'boolean',
      defaultValue: false
    },
    width: {
      name: 'width',
      defaultValue: '7rem'
    },
    icon: {
      table: {
        category: 'Slots',
      },
      control: 'text',
      description: 'Slot content',
    }
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  components: { SquareCheckbox },
  setup() {
    return { args };
  },
  template: `
  <square-checkbox v-bind="args">
    <template v-if="${'icon' in args}" v-slot:icon>${args.icon}</template>
  </square-checkbox>
  `,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  disabled: false,
  label: 'Primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'disable',
  disabled: true
};

export const SlotWithIcon = Template.bind({});
SlotWithIcon.args = {
  label: 'SlotWithIcon',
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
  <rect width="256" height="256" fill="none"></rect>
  <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
  <rect x="36" y="36" width="184" height="184" rx="48" stroke-width="12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect>
  <circle cx="180" cy="75.99998" r="10"></circle>
</svg>`
};
