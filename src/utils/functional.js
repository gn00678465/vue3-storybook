/**
 * @func
 * @param {Number} a
 * @returns {(b:Number) => Number}
 */
export const add = (a) => (b) => Number(a) + Number(b);

/**
 * @func
 * @param {Number} n
 * @return {Number} n + 1
 */
export const increment = add(1);

/**
 * @func
 * @param {Number} n
 * @return {Number} n - 1
 */
export const decrement = add(-1);

/**
 * @func
 * @param  {...any[Function]} args
 * @returns {(x:*) => *}
 */
export const pipe = (...args) => (x) => args.reduce((g, f) => f(g), x);

export const setRef = (ref) => (val) => { ref.value = val; return ref; };
export const getRef = (ref) => ref.value;
