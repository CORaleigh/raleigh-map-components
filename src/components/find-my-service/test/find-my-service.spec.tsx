import { newSpecPage } from '@stencil/core/testing';
import { FindMyService } from '../find-my-service';

describe('find-my-service', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FindMyService],
      html: `<find-my-service></find-my-service>`,
    });
    expect(page.root).toEqualHtml(`
      <find-my-service>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </find-my-service>
    `);
  });
});
