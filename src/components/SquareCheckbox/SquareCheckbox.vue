<script>
import { h, defineComponent, ref, reactive, computed, watch, getCurrentInstance, onMounted } from 'vue';
import { findUpwardComponent } from '@/utils/assets';

export default defineComponent({
  name: 'SquareCheckbox',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: String,
      default: 'Checkbox'
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: '7rem'
    },
    borderColor: {
      type: String,
      default: '#2260ff'
    },
    name: { type: String }
  },
  setup(context, { emit, slots }) {
    const instance = getCurrentInstance();

    const currentValue = ref(context.value);
    const model = reactive([]);
    const group = ref(false);
    const parent = ref(findUpwardComponent(instance, 'SquareCheckboxGroup'));

    const styles = computed(() => ({
      '--checkboxWidth': context.width,
      '--borderColor': context.borderColor
    }));

    watch(() => context.value, (newVal) => {
      if (newVal === context.trueValue || newVal === context.falseValue) {
        updateModel();
      }
      else {
        throw 'Value should be trueValue or falseValue.';
      }
    });

    onMounted(() => {
      parent.value = findUpwardComponent(instance, 'SquareCheckboxGroup');
      if(parent.value) { group.value = true; }
      if(group.value) {
        // parent.value.change(model.value);
      }
      else { updateModel(); }
    });

    const onInput = (event) => {
      const { value, checked } = event.target;
      if(model.includes(value) && checked) {
        const index = model.indexOf(value);
        model.splice(index, 1);
      }
      if(model.includes && !checked) {
        model.push(value);
      }
    };
    const onChange = (event) => {
      if (context.disabled) return false;
      const checked = event.target.checked;
      currentValue.value = checked;
      const value = checked ? context.trueValue : context.falseValue;
      emit('input', value);
      if (group.value) {
        // parent.value.change(model.value);
      }
      else {
        emit('on-change', value);
      }
    };

    function updateModel() {
      currentValue.value = context.value === context.trueValue;
    }



    const inputProp = group.value ? {
      value: context.label,
      onInput: onInput,
    } : {};

    return () => h('div', {
      class: ['checkbox', {
        disabled: context.disabled
      }],
      style: styles.value
    }, [
      h('label', { class: 'checkbox-wrapper' }, [
        h('input', {
          class: 'checkbox-input',
          type: 'checkbox',
          disabled: context.disabled,
          checked: currentValue.value,
          name: context.name,
          onchange: onChange,
          ...inputProp
        }),
        h('span', { class: 'checkbox-tile' }, [
          h('span', { class: 'checkbox-icon' }, slots.icon && slots.icon()),
          h('span', { class: 'checkbox-label' }, context.label)
        ])
      ])
    ]);
  }
});
</script>

<style lang="scss">
@import './SquareCheckbox.scss';
</style>
