import { newE2EPage } from '@stencil/core/testing';

describe('web-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<web-map></web-map>');

    const element = await page.find('web-map');
    expect(element).toHaveClass('hydrated');
  });
});
