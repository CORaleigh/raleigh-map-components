import { newE2EPage } from '@stencil/core/testing';

describe('find-my-service', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<find-my-service></find-my-service>');

    const element = await page.find('find-my-service');
    expect(element).toHaveClass('hydrated');
  });
});
