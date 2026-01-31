const renderStack = (content: string) => `
  <div style="display:grid;gap:12px;max-width:60ch;">
    ${content}
  </div>
`;

const renderCard = (content: string) => `
  <div
    style="border:1px solid var(--cdr-color-border-primary,#d1d1d1);padding:16px;container-type:inline-size;"
  >
    ${content}
  </div>
`;

export default {
  title: 'Typography/Title',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Titles name a content object (like a product or article) and scale fluidly using container queries so the same title adapts across layouts.',
      },
    },
  },
};

export const Base = {
  render: () => '<h1 class="cdr-title">Atomic title</h1>',
};

export const WithKickerAndAbstract = {
  render: () =>
    renderStack(`
      <span class="cdr-kicker">Backpacking</span>
      <h2 class="cdr-title">Passage 2 Tent</h2>
      <p class="cdr-abstract">
        A dependable two-person shelter that balances packability with quick setup.
      </p>
    `),
};

export const ResponsiveContainer = {
  render: () => `
    <div style="display:grid;gap:16px;max-width:720px;">
      ${renderCard('<h3 class="cdr-title">Compact title in a narrow card</h3>')}
      ${renderCard('<h3 class="cdr-title">Title sizing adapts to wider containers</h3>')}
    </div>
  `,
};

export const ContainerQueryGrid = {
  render: () => `
    <div
      style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;"
    >
      ${renderCard(
        '<h3 class="cdr-title">Atomic title</h3><p class="cdr-abstract">Short abstract copy.</p>',
      )}
      ${renderCard(
        '<h3 class="cdr-title">Atomic title with a longer headline</h3><p class="cdr-abstract">Short abstract copy.</p>',
      )}
      ${renderCard(
        '<h3 class="cdr-title">Atomic title</h3><p class="cdr-abstract">Short abstract copy.</p>',
      )}
    </div>
  `,
};
