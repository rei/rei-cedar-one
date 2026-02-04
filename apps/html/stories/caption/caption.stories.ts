import summaryOnly from './fragments/summary-only.html?raw';
import summaryWithCredit from './fragments/summary-with-credit.html?raw';

const renderBlock = (content: string) => `
  <div class="c1-story-grid c1-story-gap-12">
    ${content}
  </div>
`;

export default {
  title: 'HTML/Typography/Caption',
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
  render: () => renderBlock(summaryOnly),
};

export const SummaryWithCredit = {
  render: () => renderBlock(summaryWithCredit),
};
