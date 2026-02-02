import base from './fragments/base.html?raw';
import disabled from './fragments/disabled.html?raw';
import hiddenLabel from './fragments/hidden-label.html?raw';
import infoLink from './fragments/info-link.html?raw';
import optionalWithHelper from './fragments/optional-with-helper.html?raw';
import requiredWithHelper from './fragments/required-with-helper.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:480px;">
    ${content}
  </div>
`;

export default {
  title: 'Forms/Label Standalone',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standalone labels provide form label typography with helper, optional, and info treatments when you are composing custom form layouts.',
      },
    },
  },
};

export const Base = {
  render: () => renderBlock(base),
};

export const RequiredWithHelper = {
  render: () => renderBlock(requiredWithHelper),
};

export const OptionalWithHelper = {
  render: () => renderBlock(optionalWithHelper),
};

export const InfoLink = {
  render: () => renderBlock(infoLink),
};

export const HiddenLabel = {
  render: () => renderBlock(hiddenLabel),
};

export const Disabled = {
  render: () => renderBlock(disabled),
};
