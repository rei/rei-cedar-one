const renderBlock = (content: string) => `
  <div style="display:grid;gap:12px;max-width:60ch;">
    ${content}
  </div>
`;

export default {
  title: 'Typography/Kicker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Kickers sit above a title or heading to categorize or capture interest, using atomic-content typography.',
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
      <h2 class="cdr-title">Title</h2>
      <p class="cdr-abstract">
        Abstract text that explains the headline in a bit more detail.
      </p>
    `),
};
