import mitt from 'mitt';
const emitter = mitt();

const eventBus = {};
eventBus.$on = emitter.on;
eventBus.$off = emitter.off;
eventBus.$emit = emitter.emit;


function dispatch(componentName, eventName, params) {
  let parent = this.parent || this.root;
  let name = parent.type.name;
  while (parent && (!name || name !== componentName)) {
    parent = parent.parent;
    if(parent) {
      name = parent.type.name;
    }
  };
  if(parent) {
    // parent.emit.apply(parent, [eventName].concat(params));
    eventBus.$emit(eventName, ...params);
  }
}

export { eventBus, dispatch };
