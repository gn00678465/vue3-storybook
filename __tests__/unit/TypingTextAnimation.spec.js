import { screen, logRoles } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/vue';
import TypingTextAnimation from '@/components/TypingTextAnimation/TypingTextAnimation.vue';

jest.setTimeout(30000);

describe('TypingTextAnimation.vue', () => {
  it('renders props.msg when passed', async () => {
    const text = ['text'];
    const { getByText } = render(TypingTextAnimation, {
      props: { text },
    });
    const wait = 2250 + 4 * 200;
    await new Promise((r) => setTimeout(r, wait));
    expect(getByText('text')).toBeInTheDocument;
  });
});
