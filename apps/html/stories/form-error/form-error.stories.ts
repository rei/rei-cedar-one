import active from './fragments/active.html?raw';
import base from './fragments/base.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:480px;">
    ${content}
  </div>
`;

export default {
  title: 'Forms/Form Error',
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
