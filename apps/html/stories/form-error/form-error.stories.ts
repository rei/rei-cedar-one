import active from './fragments/active.html?raw';
import base from './fragments/base.html?raw';

const renderBlock = (content: string) => `
  <div class="c1-story-grid c1-story-gap-16 c1-story-max-480">
    ${content}
  </div>
`;

export default {
  title: 'HTML/Forms/Form Error',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Form errors display validation feedback with an icon and error text, expanding only when the error state is active.',
      },
    },
  },
};

export const Active = {
  render: () => renderBlock(active),
};

export const Base = {
  render: () => renderBlock(base),
};
