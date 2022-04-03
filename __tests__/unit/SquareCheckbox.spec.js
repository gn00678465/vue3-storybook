import { screen, logRoles } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/vue';
import SquareCheckbox from '@/components/SquareCheckbox/SquareCheckbox.vue';

describe('SquareCheckbox.vue', () => {
  it('renders without passed prop', () => {
    const { getByRole } = render(SquareCheckbox, {});
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' });
    expect(checkbox).not.toBeChecked;
  });

  it('renders props.value when passed', () => {
    const { getByRole } = render(SquareCheckbox, {
      props: { value: true },
    });
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' });
    expect(checkbox).toBeChecked;
  });

  it('renders props.disabled when passed', () => {
    const { getByRole } = render(SquareCheckbox, {
      props: { disabled: true },
    });
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' });
    expect(checkbox).toBeDisabled;
  });

  it('renders slot icon when passed', () => {
    const { getByTestId } = render(SquareCheckbox, {
      slots: {
        icon: '<div data-testid="slot-element">icon</div>',
      }
    });
    const slotElm = screen.getByTestId('slot-element')
    expect(slotElm).toBeInTheDocument;
  });

  it('emit test', () => {
    const { getByRole, emitted } = render(SquareCheckbox, {
    });
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox' });
    fireEvent.click(checkbox);
    expect(emitted().input).toBeTruthy()
    expect(emitted()['on-change']).toBeTruthy()
  })
});
