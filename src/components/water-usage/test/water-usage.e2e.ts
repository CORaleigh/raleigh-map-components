import { newE2EPage } from '@stencil/core/testing';

describe('water-usage', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<water-usage></water-usage>');

    const element = await page.find('water-usage');
    expect(element).toHaveClass('hydrated');
  });
});
