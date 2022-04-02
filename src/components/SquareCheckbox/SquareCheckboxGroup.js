import { h } from 'vue';

export default {
  name: 'SquareCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      currentValue: this.value || [],
      children: []
    };
  },
  watch: {
    value () {
      this.updateModel(true);
    }
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    findChildren(context, componentName) {
      return context.$slots.default().reduce((components, child) => {
        if(child.type.name === componentName) components.push(child);
        return components;
      }, []);
    },
    updateModel(update) {
      this.children = this.findChildren(this, 'SquareCheckbox');
      if (this.children) {
        const value = this.value || [];
        this.children.forEach(child => {
          child.model = value;
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
    }
  },
  render() {
    return h('div',{
      ref: 'divRef'
    }, this.$slots.default());
  }
};
