import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { C1IconInformationStroke, C1IconSearch } from '@rei/c1-icons/react';
import C1Input from '../components/input';

type InputStoryArgs = {
  label: string;
  modelValue: string;
  type: string;
  background: 'primary' | 'secondary';
  size: '' | 'large';
  rows: number;
  required: boolean;
  optional: boolean;
  disabled: boolean;
  hideLabel: boolean;
  numeric: boolean;
  error: boolean;
  errorMessage: string;
  helperTextTop: string;
  helperTextBottom: string;
  showPreIcon: boolean;
  showPostIcon: boolean;
  showPostIcons: boolean;
  showInfo: boolean;
  infoText: string;
  showInfoAction: boolean;
};

export const InputArgsData: InputStoryArgs = {
  label: 'Input label',
  modelValue: '',
  type: 'text',
  background: 'primary',
  size: '',
  rows: 1,
  required: false,
  optional: false,
  disabled: false,
  hideLabel: false,
  numeric: false,
  error: false,
  errorMessage: 'Please enter a valid value.',
  helperTextTop: '',
  helperTextBottom: '',
  showPreIcon: false,
  showPostIcon: false,
  showPostIcons: false,
  showInfo: false,
  infoText: 'Why we ask',
  showInfoAction: false,
};

const iconInfo = (
  <C1IconInformationStroke aria-hidden="true" focusable={false} inheritColor />
);

const iconSearch = (
  <C1IconSearch aria-hidden="true" focusable={false} inheritColor />
);

const InputStory = (args: InputStoryArgs) => {
  const [modelValue, setModelValue] = useState(args.modelValue ?? '');

  useEffect(() => {
    setModelValue(args.modelValue ?? '');
  }, [args.modelValue]);

  const errorValue = args.error ? args.errorMessage || true : false;
  const postIcon = useMemo(() => {
    if (!args.showPostIcon && !args.showPostIcons) return undefined;
    if (args.showPostIcons) {
      return (
        <>
          <button
            type="button"
            className="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
            aria-label="Clear input"
          >
            {iconInfo}
          </button>
          <button
            type="button"
            className="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
            aria-label="More info"
          >
            {iconSearch}
          </button>
        </>
      );
    }
    return iconInfo;
  }, [args.showPostIcon, args.showPostIcons]);

  const slots = {
    'helper-text-top': args.helperTextTop || undefined,
    'helper-text-bottom': args.helperTextBottom || undefined,
    'pre-icon': args.showPreIcon ? iconSearch : undefined,
    'post-icon': postIcon,
    info: args.showInfo ? (
      <a className="cdr-link cdr-link--standalone" href="#">
        {args.infoText}
      </a>
    ) : undefined,
    'info-action': args.showInfoAction ? (
      <button
        type="button"
        className="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
        aria-label="More info"
      >
        {iconInfo}
      </button>
    ) : undefined,
    error: args.errorMessage || undefined,
  };

  return (
    <div style={{ display: 'grid', gap: '16px', maxWidth: '520px' }}>
      <div
        style={
          args.background === 'secondary'
            ? {
                background: 'var(--cdr-color-background-input-default-active)',
                padding: '16px',
                borderRadius: '12px',
              }
            : undefined
        }
      >
        <C1Input
          label={args.label}
          type={args.type}
          background={args.background}
          size={args.size || undefined}
          rows={args.rows || 1}
          required={args.required}
          optional={args.optional}
          disabled={args.disabled}
          hideLabel={args.hideLabel}
          numeric={args.numeric}
          error={errorValue}
          postIcons={args.showPostIcons}
          slots={slots}
          modelValue={modelValue}
          onUpdateModelValue={setModelValue}
        />
      </div>
    </div>
  );
};

const renderInput = (args: InputStoryArgs) => <InputStory {...args} />;

const meta = {
  component: C1Input,
  title: 'React/Forms/Input',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    ...InputArgsData,
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Props' } },
    modelValue: { control: 'text', table: { category: 'Props' } },
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'number',
        'password',
        'search',
        'url',
        'tel',
        'date',
        'datetime-local',
      ],
      table: { category: 'Props' },
    },
    background: {
      control: 'select',
      options: ['primary', 'secondary'],
      table: { category: 'Props' },
    },
    size: {
      control: 'select',
      options: ['', 'large'],
      table: { category: 'Props' },
    },
    rows: {
      control: { type: 'number', min: 1, step: 1 },
      table: { category: 'Props' },
    },
    required: { control: 'boolean', table: { category: 'Props' } },
    optional: { control: 'boolean', table: { category: 'Props' } },
    disabled: { control: 'boolean', table: { category: 'Props' } },
    hideLabel: { control: 'boolean', table: { category: 'Props' } },
    numeric: { control: 'boolean', table: { category: 'Props' } },
    error: { control: 'boolean', table: { category: 'Props' } },
    errorMessage: { control: 'text', table: { category: 'Content' } },
    helperTextTop: { control: 'text', table: { category: 'Content' } },
    helperTextBottom: { control: 'text', table: { category: 'Content' } },
    showPreIcon: { control: 'boolean', table: { category: 'Slots' } },
    showPostIcon: { control: 'boolean', table: { category: 'Slots' } },
    showPostIcons: { control: 'boolean', table: { category: 'Slots' } },
    showInfo: { control: 'boolean', table: { category: 'Slots' } },
    infoText: { control: 'text', table: { category: 'Content' } },
    showInfoAction: { control: 'boolean', table: { category: 'Slots' } },
  },
  render: renderInput,
} satisfies Meta<InputStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...InputArgsData,
  },
};

export const WithHelperText: Story = {
  args: {
    ...InputArgsData,
    helperTextTop: 'Helper text above the field.',
    helperTextBottom: 'Helper text below the field.',
  },
};

export const ErrorState: Story = {
  args: {
    ...InputArgsData,
    error: true,
    errorMessage: 'Please enter a valid value.',
  },
};

export const PreIcon: Story = {
  args: {
    ...InputArgsData,
    showPreIcon: true,
  },
};

export const PostIcon: Story = {
  args: {
    ...InputArgsData,
    showPostIcon: true,
  },
};

export const WithPostIcons: Story = {
  args: {
    ...InputArgsData,
    showPostIcons: true,
  },
};

export const WithInfo: Story = {
  args: {
    ...InputArgsData,
    showInfo: true,
    infoText: 'Why we ask',
  },
};

export const WithInfoAction: Story = {
  args: {
    ...InputArgsData,
    showInfoAction: true,
  },
};

export const SecondaryBackground: Story = {
  args: {
    ...InputArgsData,
    background: 'secondary',
  },
};
