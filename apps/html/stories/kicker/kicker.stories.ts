import base from './fragments/base.html?raw';
import titlePairing from './fragments/title-pairing.html?raw';

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
  render: () => renderBlock(base),
};

export const TitlePairing = {
  render: () => renderBlock(titlePairing),
};
