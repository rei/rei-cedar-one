const renderRow = (items: string) => `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
    ${items}
  </div>
`;

export default {
  title: 'Controls/Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Link styles cover neutral and standalone treatments plus button-tag links for actions that look like links.',
      },
    },
  },
};

export const Base = {
  render: () => renderRow(`<a class="cdr-link" href="#link">Default link</a>`),
};

export const ButtonTag = {
  render: () =>
    renderRow(`<button type="button" class="cdr-link">Button link</button>`),
};

export const Modifiers = {
  render: () => `
    ${renderRow(`
      <a class="cdr-link cdr-link--standalone" href="#link">Standalone</a>
      <a class="cdr-link cdr-link--neutral" href="#link">Neutral</a>
      <a class="cdr-link cdr-link--standalone cdr-link--neutral" href="#link">Standalone neutral</a>
    `)}
    <div style="color:#1f513f;margin-top:8px;">
      ${renderRow(
        `<a class="cdr-link cdr-link--inherit-color" href="#link">Inherit color</a>`,
      )}
    </div>
  `,
};
