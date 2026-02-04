import base from './fragments/base.html?raw';
import titlePairing from './fragments/title-pairing.html?raw';

const renderBlock = (content: string) => `
  <div class="c1-story-grid c1-story-gap-12 c1-story-max-60ch">
    ${content}
  </div>
`;

export default {
  title: 'HTML/Typography/Kicker',
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
