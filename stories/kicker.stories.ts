const renderBlock = (content: string) => `
  <div style="display:grid;gap:12px;max-width:60ch;">
    ${content}
  </div>
`;

export default {
  title: 'Kicker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HTML-first kicker styles for Cedar. Derived from Cedar docs examples and common title pairings.',
      },
    },
  },
};

export const Base = {
  render: () =>
    renderBlock(`
      <span class="cdr-kicker">Kicker</span>
    `),
};

export const TitlePairing = {
  render: () =>
    renderBlock(`
      <span class="cdr-kicker">Kicker</span>
      <p class="cdr-heading-sans">Title</p>
      <p class="cdr-body">
        Abstract text that explains the headline in a bit more detail.
      </p>
    `),
};
