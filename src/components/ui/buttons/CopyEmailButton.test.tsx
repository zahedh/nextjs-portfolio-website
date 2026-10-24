import { act, fireEvent, render, screen } from '@testing-library/react';
import { en } from '@/language';
import CopyEmailButton from './CopyEmailButton';

describe('CopyEmailButton', () => {
  it('copies the address, announces it, and clears the confirmation', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyEmailButton />);
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', {
          name: `${en.footerSection.copyLabel}, ${en.footerSection.email}`,
        })
      );
    });

    expect(writeText).toHaveBeenCalledWith(en.footerSection.email);
    expect(screen.getByRole('status')).toHaveTextContent(
      en.footerSection.copiedLabel
    );

    act(() => jest.advanceTimersByTime(2000));
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    jest.useRealTimers();
  });
});
