import { act, fireEvent, render, screen } from '@testing-library/react';
import { en } from '@/language';
import { CopyEmailButton } from './CopyEmailButton';

async function clickCopy(): Promise<jest.Mock> {
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
  return writeText;
}

describe('CopyEmailButton', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('GIVEN the button WHEN clicked THEN the address is copied', async () => {
    const writeText = await clickCopy();

    expect(writeText).toHaveBeenCalledWith(en.footerSection.email);
  });

  it('GIVEN the button WHEN clicked THEN the copy is announced', async () => {
    await clickCopy();

    expect(screen.getByRole('status')).toHaveTextContent(
      en.footerSection.copiedLabel
    );
  });

  it('GIVEN a copy was announced WHEN two seconds pass THEN the confirmation clears', async () => {
    await clickCopy();

    act(() => jest.advanceTimersByTime(2000));

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });
});
