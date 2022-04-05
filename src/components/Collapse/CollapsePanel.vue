<script>
import { h, ref, computed, getCurrentInstance, Transition, reactive, onMounted } from 'vue';
import Collapse from './Collapse.vue';
import { dispatch } from '@/utils/emitter';
import './style.scss';

export default {
  name: 'CollapsePanel',
  props: {
    name: {
      type: String,
      default: '',
    },
    defaultClickAction: {
      type: Boolean,
      default: false,
    }
  },
  setup(context, { slots, expose }) {
    const instance = getCurrentInstance();

    const panel = reactive({
      parent: null,
      innerName: computed(() => {
        return context.name || Math.random().toString(32).substr(2);
      }),
      activeKeys: computed(() => {
        return panel.parent && panel.parent.exposed && panel.parent.exposed.value || [];
      }),
      activeClass: computed(() => {
        return panel.parent && panel.parent.exposed && panel.parent.exposed.activeClass || 'collapse-panel-active';
      }),
      status: computed(() => {
        return panel.activeKeys.includes(panel.innerName);
      })
    })

    function open() {
      dispatch.call(instance, 'Collapse', 'collapse.open', [panel.innerName]);
    };
    function close() {
      dispatch.call(instance, 'Collapse', 'collapse.close', [panel.innerName]);
    };
    function toggle() {
      if (panel.status) { close(); }
      else { open(); }
    };

    function handleFixedClick() {
      if (context.defaultClickAction) { toggle(); }
    }

    function getContentHeight(el) {
    if (el.scrollHeight) return el.scrollHeight + 'px';
    return '';
  }

    const beforeEnter = (el) => { el.style.height = '0px'; };
    const enter = (el, done) => {
      el.style.height = getContentHeight(el);
      done();
    }
    const afterEnter = (el) => { el.style.height = getContentHeight(el); }
    const beforeLeave = (el) => { el.style.height = getContentHeight(el); }
    const leave = (el, done) => {
      setTimeout(() => {
        el.style.height = '0px';
      }, 0);
      done;
    }
    const afterLeave = (el) => { el.style.height = '0px'; }

    onMounted(() => {
      let p = instance.parent;
      while (p) {
        if (p && p.type.name !== 'Collapse') {
          p = p.parent;
        }
        else {
          panel.parent = p;
          return;
        }
      }
    });

    return () => h('div', {
      class: ['collapse-panel', panel.status ? panel.activeClass : '']
    }, [
      h('div', {
        class: 'collapse-panel-fixed',
        onClick: handleFixedClick
      }, slots.fixed && slots.fixed({
        toggle,
        open,
        close
      })),
      h(Transition, {
        onBeforeEnter: beforeEnter,
        onEnter: enter,
        onAfterEnter: afterEnter,
        onBeforeLeave: beforeLeave,
        onLeave: leave,
        onAfterLeave: afterLeave
      }, panel.status ? () => [h('div', {
          class: 'collapse-panel-content',
          style: {
            display: panel.status ? 'block' : 'none'
          }
        }, slots.default())
      ] : null)
    ]);
  }
};
</script>
