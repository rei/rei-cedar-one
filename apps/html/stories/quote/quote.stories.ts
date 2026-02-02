import blockquote from './fragments/blockquote.html?raw';
import pullquote from './fragments/pullquote.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:60ch;">
    ${content}
  </div>
`;

export default {
  title: 'Typography/Quote',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Block quotes separate external source text; pull quotes repeat an excerpt to emphasize or aid scanning.',
      },
    },
  },
};

export const Blockquote = {
  render: () => renderBlock(blockquote),
};

export const Pullquote = {
  render: () => renderBlock(pullquote),
};
