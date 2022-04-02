export function findUpwardComponent(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  }
  else {
    componentNames = componentName;
  }
  let parent = context.parent;
  let name = parent.type.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.parent;
    if (parent) name = parent.type.name;
  }
  return parent;
}

// // Find components upward
// export function findComponentUpward (context, componentName, componentNames) {
//   if (typeof componentName === 'string') {
//     componentNames = [componentName];
//   }
//   else {
//     componentNames = componentName;
//   }

//   let parent = context.$parent;
//   let name = parent.$options.name;
//   while (parent && (!name || componentNames.indexOf(name) < 0)) {
//     parent = parent.$parent;
//     if (parent) name = parent.$options.name;
//   }
//   return parent;
// }

// // Find component downward
// export function findComponentDownward (context, componentName) {
//   const $children = context.$children;
//   let children = null;

//   if ($children.length) {
//     for (const child of $children) {
//       const name = child.$options.name;
//       if (name === componentName) {
//         children = child;
//         break;
//       }
//       else {
//         children = findComponentDownward(child, componentName);
//         if (children) break;
//       }
//     }
//   }
//   return children;
// }

// // Find components downward
// export function findComponentsDownward (context, componentName) {
//   return context.$children.reduce((components, child) => {
//     if (child.$options.name === componentName) components.push(child);
//     const foundChilds = findComponentsDownward(child, componentName);
//     return components.concat(foundChilds);
//   }, []);
// }

// // Find components upward
// export function findComponentsUpward (context, componentName) {
//   let parents = [];
//   const parent = context.$parent;
//   if (parent) {
//     if (parent.$options.name === componentName) parents.push(parent);
//     return parents.concat(findComponentsUpward(parent, componentName));
//   }
//   else {
//     return [];
//   }
// }
