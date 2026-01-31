const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:60ch;">
    ${content}
  </div>
`;

export default {
  title: 'Quote',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HTML-first quote styles for Cedar. Derived from Cedar site block and pull quote examples.',
      },
    },
  },
};

export const Blockquote = {
  render: () =>
    renderBlock(`
      <blockquote class="cdr-quote">
        <p class="cdr-quote__summary">
          Never doubt that a small group of thoughtful, committed citizens can
          change the world; indeed, it's the only thing that ever has.
        </p>
        <cite class="cdr-quote__citation">Margaret Mead</cite>
      </blockquote>
    `),
};

export const Pullquote = {
  render: () =>
    renderBlock(`
      <aside class="cdr-quote cdr-quote--pull">
        <p class="cdr-quote__summary">
          Never doubt that a small group of thoughtful, committed citizens can
          change the world; indeed, it's the only thing that ever has.
        </p>
      </aside>
    `),
};
