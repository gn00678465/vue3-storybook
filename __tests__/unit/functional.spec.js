import { add, increment, decrement, setRef, getRef } from '@/utils/functional.js';
import { ref } from 'vue';

describe('functional.js', () => {
  it('add function test', () => {
    const a = 1;
    const b = 2;
    expect(add(a)(b)).toBe(3);
  });

  it('increment function test', () => {
    const a = 40;
    expect(increment(a)).toBe(41);
  });

  it('decrement function test', () => {
    const a = 40;
    expect(decrement(a)).toBe(39);
  });

  it('getRef function test', () => {
    const a = ref(10);
    expect(getRef(a)).toBe(10);
  });

  it('setRef function test', () => {
    const a = ref(null);
    expect(setRef(a)('ref value').value).toEqual('ref value');
  });
});
