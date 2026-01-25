const SIZE_CLASSES = {
  small: 'cdr-button--small',
  medium: 'cdr-button--medium',
  large: 'cdr-button--large',
} as const;

const VARIANT_CLASSES = {
  primary: 'cdr-button--primary',
  secondary: 'cdr-button--secondary',
  dark: 'cdr-button--dark',
  sale: 'cdr-button--sale',
  link: 'cdr-button--link',
} as const;

const iconSvg = `
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path role="presentation" d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm6.762 7a7.073 7.073 0 00-13.524 0h13.524zM4 21a1 1 0 01-1-1h-.008a9.08 9.08 0 01.02-.159 9.08 9.08 0 015.454-7.127 5.5 5.5 0 117.068 0A9.08 9.08 0 0121.008 20H21a1 1 0 01-1 1H4z" />
  </svg>
`;

type ButtonArgs = {
  label: string;
  size: keyof typeof SIZE_CLASSES;
  variant: keyof typeof VARIANT_CLASSES;
  fullWidth: boolean;
  iconLeft: boolean;
  iconRight: boolean;
  disabled: boolean;
};

const renderButton = ({
  label,
  size,
  variant,
  fullWidth,
  iconLeft,
  iconRight,
  disabled,
}: ButtonArgs) => {
  const classes = [
    'cdr-button',
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    fullWidth ? 'cdr-button--full-width' : '',
    iconLeft ? 'cdr-button--has-icon-left' : '',
    iconRight ? 'cdr-button--has-icon-right' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const left = iconLeft ? iconSvg : '';
  const right = iconRight ? iconSvg : '';
  const disabledAttr = disabled ? 'disabled' : '';

  return `<button type="button" class="${classes}" ${disabledAttr}>${left}${label}${right}</button>`;
};

export default {
  title: 'Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'HTML-first button styles for Cedar. Validate variants, sizes, and icon combinations.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.keys(SIZE_CLASSES),
    },
    variant: {
      control: { type: 'select' },
      options: Object.keys(VARIANT_CLASSES),
    },
    fullWidth: { control: 'boolean' },
    iconLeft: { control: 'boolean' },
    iconRight: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: renderButton,
};

export const Primary = {
  args: {
    label: 'Primary',
    size: 'medium',
    variant: 'primary',
    fullWidth: false,
    iconLeft: false,
    iconRight: false,
    disabled: false,
  },
};

export const WithIcons = {
  args: {
    label: 'With Icons',
    size: 'medium',
    variant: 'secondary',
    fullWidth: false,
    iconLeft: true,
    iconRight: true,
    disabled: false,
  },
};

export const AllVariants = {
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      ${renderButton({ label: 'Primary', size: 'medium', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Secondary', size: 'medium', variant: 'secondary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Dark', size: 'medium', variant: 'dark', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Sale', size: 'medium', variant: 'sale', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Link', size: 'medium', variant: 'link', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
    </div>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      ${renderButton({ label: 'Small', size: 'small', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Medium', size: 'medium', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Large', size: 'large', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
    </div>
  `,
};

export const Disabled = {
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      ${renderButton({ label: 'Primary', size: 'medium', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: false, disabled: true })}
      ${renderButton({ label: 'Secondary', size: 'medium', variant: 'secondary', fullWidth: false, iconLeft: false, iconRight: false, disabled: true })}
      ${renderButton({ label: 'Dark', size: 'medium', variant: 'dark', fullWidth: false, iconLeft: false, iconRight: false, disabled: true })}
      ${renderButton({ label: 'Sale', size: 'medium', variant: 'sale', fullWidth: false, iconLeft: false, iconRight: false, disabled: true })}
      ${renderButton({ label: 'Link', size: 'medium', variant: 'link', fullWidth: false, iconLeft: false, iconRight: false, disabled: true })}
    </div>
  `,
};

export const FullWidth = {
  render: () => `
    <div style="display:grid;gap:12px;max-width:320px">
      ${renderButton({ label: 'Full Width', size: 'medium', variant: 'primary', fullWidth: true, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Full Width', size: 'medium', variant: 'secondary', fullWidth: true, iconLeft: false, iconRight: false, disabled: false })}
    </div>
  `,
};

export const IconOnly = {
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      <button type="button" class="cdr-button cdr-button--primary cdr-button--icon-only" aria-label="Icon only">${iconSvg}</button>
      <button type="button" class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--icon-only-large" aria-label="Icon only large">${iconSvg}</button>
      <button type="button" class="cdr-button cdr-button--primary cdr-button--icon-only cdr-button--with-background" aria-label="With background">${iconSvg}</button>
    </div>
  `,
};

export const ResponsiveSizes = {
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      <button type="button" class="cdr-button cdr-button--primary cdr-button--small@xs cdr-button--medium@sm cdr-button--large@md">
        Responsive
      </button>
      <button type="button" class="cdr-button cdr-button--secondary cdr-button--small@xs cdr-button--medium@sm cdr-button--large@md cdr-button--full-width@xs">
        Responsive Full
      </button>
    </div>
  `,
};

export const SizeVariantMatrix = {
  render: () => `
    <div style="display:grid;gap:12px;grid-template-columns:repeat(3,minmax(0,1fr));align-items:center;justify-items:start">
      ${Object.keys(SIZE_CLASSES)
        .map((size) =>
          Object.keys(VARIANT_CLASSES)
            .map((variant) =>
              renderButton({
                label: `${variant} / ${size}`,
                size: size as keyof typeof SIZE_CLASSES,
                variant: variant as keyof typeof VARIANT_CLASSES,
                fullWidth: false,
                iconLeft: false,
                iconRight: false,
                disabled: false,
              }),
            )
            .join(''),
        )
        .join('')}
    </div>
  `,
};

export const IconCombos = {
  render: () => `
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      ${renderButton({ label: 'Left', size: 'small', variant: 'primary', fullWidth: false, iconLeft: true, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Right', size: 'small', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: true, disabled: false })}
      ${renderButton({ label: 'Both', size: 'small', variant: 'primary', fullWidth: false, iconLeft: true, iconRight: true, disabled: false })}
      ${renderButton({ label: 'Left', size: 'medium', variant: 'secondary', fullWidth: false, iconLeft: true, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Right', size: 'medium', variant: 'secondary', fullWidth: false, iconLeft: false, iconRight: true, disabled: false })}
      ${renderButton({ label: 'Both', size: 'medium', variant: 'secondary', fullWidth: false, iconLeft: true, iconRight: true, disabled: false })}
      ${renderButton({ label: 'Left', size: 'large', variant: 'dark', fullWidth: false, iconLeft: true, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Right', size: 'large', variant: 'dark', fullWidth: false, iconLeft: false, iconRight: true, disabled: false })}
      ${renderButton({ label: 'Both', size: 'large', variant: 'dark', fullWidth: false, iconLeft: true, iconRight: true, disabled: false })}
    </div>
  `,
};

export const DarkBackground = {
  render: () => `
    <div style="background:#2e2e2b;padding:16px;display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      ${renderButton({ label: 'Primary', size: 'medium', variant: 'primary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Secondary', size: 'medium', variant: 'secondary', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Dark', size: 'medium', variant: 'dark', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Sale', size: 'medium', variant: 'sale', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
      ${renderButton({ label: 'Link', size: 'medium', variant: 'link', fullWidth: false, iconLeft: false, iconRight: false, disabled: false })}
    </div>
  `,
};
