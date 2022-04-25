import { mount } from '@vue/test-utils';
import Promised from '../../src/components/Promised/Promised.vue';
import fakePromise from 'faked-promise';
import { h } from 'vue';

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));


describe('Promised', () => {
  function factory(propsData, slots) {
    const [promise, resolve, reject] = fakePromise();
    const wrapper = mount(Promised, {
      propsData: { promise, pendingDelay: 0, ...propsData },
      slots: {
        pending: (oldData) => h('span', 'pending: ' + oldData),
        default: (data) => h('span', {}, data),
        rejected: (error) =>
          h('span', { class: 'error' }, error && error.message),
        ...slots,
      }
    });
    return { wrapper, promise, resolve, reject };
  };

  describe('three slots', () => {
    it('displays nothing with no promise', () => {
      const { wrapper } = factory({ promise: null });
      expect(wrapper.text()).toBe('');
    });

    it('displays pending', () => {
      const { wrapper } = factory();
      expect(wrapper.text()).toMatch('pending');
    });

    it('displays the resolved value once resolved', async () => {
      const { wrapper, resolve } = factory();
      resolve('foo');
      await tick();
      expect(wrapper.text()).toBe('foo');
    });

    it('contains previous data in pending slot', async () => {
      let { wrapper, promise, resolve } = factory();
      resolve('ok');
      await tick();
      expect(wrapper.text()).toBe('ok');
      // create a new promise
      [promise, resolve] = fakePromise();
      wrapper.setProps({ promise });
      await tick();
      resolve('okay');
      expect(wrapper.text()).toBe('pending: ok');
      await tick();
      expect(wrapper.text()).toBe('okay');
    });

    it('displays an error if rejected', async () => {
      const { wrapper, reject } = factory();
      reject(new Error('fail'));
      await tick();
      expect(wrapper.text()).toBe('fail');
    });

    it('should display rejected slot even if error is undefined', async () => {
      const { wrapper, reject } = factory();
      reject(undefined);
      await tick();
      expect(wrapper.find('.error')).toBeTruthy();
    });

    it('cancels previous promise', async () => {
      let { wrapper, promise, resolve } = factory();
      [promise, resolve] = fakePromise();
      wrapper.setProps({ promise });
      await tick();
      expect(wrapper.text()).toMatch('pending');
    });

    it('cancels previous rejected promise', async () => {
      let { wrapper, promise, reject } = factory();
      const other = fakePromise();
      wrapper.setProps({ promise: other[0] });
      reject(new Error('failed'));
      await tick();
      expect(wrapper.text()).toMatch('pending');
    });
  })

  describe('combined slot', () => {
    function factory(propsData, slots) {
      const [promise, resolve, reject] = fakePromise();
      const wrapper = mount(Promised, {
        propsData: { promise, pendingDelay: 0, ...propsData },
        slots: {
          combined: (state) => h('span', {}, JSON.stringify(state)),
          ...slots
        }
      });
      return { wrapper, promise, resolve, reject };
    };

    it('displays the data', async () => {
      const { wrapper, resolve } = factory();

      expect(wrapper.html()).toMatchSnapshot();

      resolve('foo');
      await tick();

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('displays the error', async () => {
      const { wrapper, reject } = factory();

      expect(wrapper.html()).toMatchSnapshot();

      reject(new Error('error'));
      await tick();

      expect(wrapper.html()).toMatchSnapshot();
    })
  });
});
