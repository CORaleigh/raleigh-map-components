import { newSpecPage } from '@stencil/core/testing';
import { WebMap } from '../web-map';

describe('web-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WebMap],
      html: `<web-map></web-map>`,
    });
    expect(page.root).toEqualHtml(`
      <web-map>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </web-map>
    `);
  });
});
