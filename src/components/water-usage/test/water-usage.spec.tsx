import { newSpecPage } from '@stencil/core/testing';
import { WaterUsage } from '../water-usage';

describe('water-usage', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WaterUsage],
      html: `<water-usage></water-usage>`,
    });
    expect(page.root).toEqualHtml(`
      <water-usage>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </water-usage>
    `);
  });
});
