import base from './fragments/base.html?raw';
import compact from './fragments/compact.html?raw';
import deeplyNested from './fragments/deeply-nested.html?raw';
import deeplyNestedOrdered from './fragments/deeply-nested-ordered.html?raw';
import inline from './fragments/inline.html?raw';
import ordered from './fragments/ordered.html?raw';
import unordered from './fragments/unordered.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:12px;">
    ${content}
  </div>
`;

export default {
  title: 'Typography/List',
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
  render: () => renderBlock(base),
};

export const Unordered = {
  render: () => renderBlock(unordered),
};

export const Ordered = {
  render: () => renderBlock(ordered),
};

export const Compact = {
  render: () => renderBlock(compact),
};

export const Inline = {
  render: () => renderBlock(inline),
};

export const DeeplyNested = {
  render: () => renderBlock(deeplyNested),
};

export const DeeplyNestedOrdered = {
  render: () => renderBlock(deeplyNestedOrdered),
};
