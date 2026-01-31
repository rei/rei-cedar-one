const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:70ch;">
    ${content}
  </div>
`;

export default {
  title: 'Abstract',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HTML-first abstract styles for Cedar. Derived from Cedar doc examples and tuned for container queries.',
      },
    },
  },
};

export const Base = {
  render: () =>
    renderBlock(`
      <p class="cdr-abstract">
        Fueling well is the key to longevity and improvement in running. Our experts
        guide you on filling your plate for your goals.
      </p>
    `),
};

export const WithKickerAndTitle = {
  render: () =>
    renderBlock(`
      <span class="cdr-kicker">Kicker</span>
      <p class="cdr-heading-sans">Title</p>
      <p class="cdr-abstract">Abstract</p>
    `),
};

export const ConstrainedContainer = {
  render: () =>
    renderBlock(`
      <div style="container-type:inline-size;max-width:700px;border:1px dashed var(--cdr-color-border-primary);padding:16px;">
        <p class="cdr-abstract">
          This abstract is inside a container query context to demonstrate the
          smaller type scale when the container is narrow.
        </p>
      </div>
    `),
};
