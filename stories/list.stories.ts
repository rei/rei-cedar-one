const renderBlock = (content: string) => `
  <div style="display:grid;gap:12px;">
    ${content}
  </div>
`;

export default {
  title: 'List',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'List styles cover bare, unordered, ordered, compact spacing, and inline layouts (including inline unordered bullets).',
      },
    },
  },
};

export const Base = {
  render: () =>
    renderBlock(`
      <ul class="cdr-list">
        <li>Base list item</li>
        <li>Second list item</li>
        <li>Third list item</li>
      </ul>
    `),
};

export const Unordered = {
  render: () =>
    renderBlock(`
      <ul class="cdr-list cdr-list--unordered">
        <li>Unordered item</li>
        <li>
          Unordered item with nested list
          <ul class="cdr-list">
            <li>Nested item</li>
            <li>Nested item</li>
          </ul>
        </li>
        <li>Unordered item</li>
      </ul>
    `),
};

export const Ordered = {
  render: () =>
    renderBlock(`
      <ol class="cdr-list cdr-list--ordered">
        <li>First item</li>
        <li>
          Second item with nested list
          <ul class="cdr-list">
            <li>Nested item</li>
            <li>Nested item</li>
          </ul>
        </li>
        <li>Third item</li>
      </ol>
    `),
};

export const Compact = {
  render: () =>
    renderBlock(`
      <ul class="cdr-list cdr-list--unordered cdr-list--compact">
        <li>Compact item</li>
        <li>Compact item</li>
        <li>Compact item</li>
      </ul>
    `),
};

export const Inline = {
  render: () =>
    renderBlock(`
      <ul class="cdr-list cdr-list--inline cdr-list--unordered">
        <li>Inline item</li>
        <li>Inline item</li>
        <li>Inline item</li>
      </ul>
      <div style="height:8px;"></div>
      <ul class="cdr-list cdr-list--inline cdr-list--unordered cdr-list--compact">
        <li>Compact inline</li>
        <li>Compact inline</li>
        <li>Compact inline</li>
      </ul>
    `),
};

export const DeeplyNested = {
  render: () =>
    renderBlock(`
      <ul class="cdr-list cdr-list--unordered">
        <li>Level 1 item</li>
        <li>
          Level 1 item with nested list
          <ul class="cdr-list">
            <li>Level 2 item</li>
            <li>
              Level 2 item with nested list
              <ul class="cdr-list">
                <li>Level 3 item</li>
                <li>
                  Level 3 item with nested list
                  <ul class="cdr-list">
                    <li>Level 4 item</li>
                    <li>Level 4 item</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>Level 1 item</li>
      </ul>
    `),
};

export const DeeplyNestedOrdered = {
  render: () =>
    renderBlock(`
      <ol class="cdr-list cdr-list--ordered">
        <li>Level 1 item</li>
        <li>
          Level 1 item with nested list
          <ol class="cdr-list">
            <li>Level 2 item</li>
            <li>
              Level 2 item with nested list
              <ol class="cdr-list">
                <li>Level 3 item</li>
                <li>
                  Level 3 item with nested list
                  <ol class="cdr-list">
                    <li>Level 4 item</li>
                    <li>Level 4 item</li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>Level 1 item</li>
      </ol>
    `),
};
