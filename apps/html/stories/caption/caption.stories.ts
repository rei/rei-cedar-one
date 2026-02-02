const renderBlock = (content: string) => `
  <div style="display:grid;gap:12px;">
    ${content}
  </div>
`;

export default {
  title: 'Typography/Caption',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Captions pair a summary with optional credit and are intended to sit with media; summary-only and credit-only variants match default styling.',
      },
    },
  },
};

export const SummaryOnly = {
  render: () =>
    renderBlock(`
      <figure>
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Person in an REI Passage 2 tent"
        />
        <figcaption class="cdr-caption">
          <p class="cdr-caption__summary">
            Person in an REI Passage 2 tent.
          </p>
        </figcaption>
      </figure>
    `),
};

export const SummaryWithCredit = {
  render: () =>
    renderBlock(`
      <figure>
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Person in an REI Passage 2 tent"
        />
        <figcaption class="cdr-caption">
          <p class="cdr-caption__summary">
            Person in an REI Passage 2 tent.
          </p>
          <cite class="cdr-caption__cite">Photo by Cedar Studio</cite>
        </figcaption>
      </figure>
    `),
};
