const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:480px;">
    ${content}
  </div>
`;

type WrapperOptions = {
  background?: 'primary' | 'secondary';
  size?: string;
  modifier?: string;
  disabled?: boolean;
  content: string;
};

const renderWrapper = ({
  background = 'primary',
  size = 'medium',
  modifier = '',
  disabled = false,
  content,
}: WrapperOptions) => {
  const classes = [
    'cdr-label-wrapper',
    `cdr-label-wrapper--${background}`,
    size ? `cdr-label-wrapper--${size}` : '',
    modifier ? `cdr-label-wrapper--${modifier}` : '',
    disabled ? 'cdr-label-wrapper--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const disabledAttr = disabled ? 'disabled' : '';
  return `
    <div class="cdr-label-wrapper__container">
      <label class="${classes}">
        <input type="checkbox" ${disabledAttr} />
        <span class="cdr-label-wrapper__figure"></span>
        <span class="cdr-label-wrapper__content">${content}</span>
      </label>
    </div>
  `;
};

export default {
  title: 'Forms/Label Wrapper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Label wrappers style checkbox and radio labels, including figure placement, background variants, and size-responsive spacing.',
      },
    },
  },
};

export const Base = {
  render: () =>
    renderBlock(renderWrapper({ content: 'Primary label wrapper' })),
};

export const Secondary = {
  render: () =>
    renderBlock(
      renderWrapper({
        background: 'secondary',
        content: 'Secondary background label wrapper',
      }),
    ),
};

export const Disabled = {
  render: () =>
    renderBlock(
      renderWrapper({
        content: 'Disabled label wrapper',
        disabled: true,
      }),
    ),
};

export const HideFigure = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-wrapper__container">
        <label class="cdr-label-wrapper cdr-label-wrapper--primary cdr-label-wrapper--hide-figure cdr-label-wrapper--medium">
          <input type="checkbox" />
          <span class="cdr-label-wrapper__figure"></span>
          <span class="cdr-checkbox__svg-box"><svg viewBox="0 0 24 24"></svg></span>
          <span class="cdr-label-wrapper__content">Hidden figure</span>
        </label>
      </div>
    `),
};

export const Sizes = {
  render: () =>
    renderBlock(`
      ${renderWrapper({ size: 'small', content: 'Small size' })}
      ${renderWrapper({ size: 'medium', content: 'Medium size' })}
      ${renderWrapper({ size: 'large', content: 'Large size' })}
    `),
};

export const ResponsiveSizes = {
  render: () =>
    renderBlock(`
      <div class="cdr-label-wrapper__container">
        <label class="cdr-label-wrapper cdr-label-wrapper--primary cdr-label-wrapper--small@xs cdr-label-wrapper--medium@sm cdr-label-wrapper--large@lg">
          <input type="checkbox" />
          <span class="cdr-label-wrapper__figure"></span>
          <span class="cdr-label-wrapper__content">Responsive sizing</span>
        </label>
      </div>
    `),
};
