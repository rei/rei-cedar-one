import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { h, ref, watch } from 'vue';

import C1Input from '../components/C1Input.vue';

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

const buildIcon = (path: string) =>
  h(
    'svg',
    {
      'aria-hidden': 'true',
      focusable: 'false',
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      width: 24,
      height: 24,
    },
    [h('path', { d: path })],
  );

const iconInfo = () =>
  buildIcon(
    'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z',
  );

const iconSearch = () =>
  buildIcon(
    'M11 4a7 7 0 1 0 4.3 12.5l3.6 3.6 1.4-1.4-3.6-3.6A7 7 0 0 0 11 4zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z',
  );

const renderInput = (args: InputStoryArgs) => ({
  components: { C1Input },
  setup() {
    const modelValue = ref(args.modelValue ?? '');

    watch(
      () => args.modelValue,
      (nextValue) => {
        modelValue.value = nextValue ?? '';
      },
    );

    const updateModelValue = (nextValue: string) => {
      modelValue.value = nextValue;
    };

    return () => {
      const errorValue = args.error ? args.errorMessage || true : false;
      const inputProps = {
        label: args.label,
        modelValue: modelValue.value,
        type: args.type,
        background: args.background,
        size: args.size || undefined,
        rows: args.rows || 1,
        required: args.required,
        optional: args.optional,
        disabled: args.disabled,
        hideLabel: args.hideLabel,
        numeric: args.numeric,
        error: errorValue,
        'onUpdate:modelValue': updateModelValue,
      };

      const slots: Record<string, () => unknown> = {};

      if (args.helperTextTop) {
        slots['helper-text-top'] = () => args.helperTextTop;
      }

      if (args.helperTextBottom) {
        slots['helper-text-bottom'] = () => args.helperTextBottom;
      }

      if (args.showPreIcon) {
        slots['pre-icon'] = () => iconSearch();
      }

      if (args.showPostIcon || args.showPostIcons) {
        slots['post-icon'] = () => {
          if (args.showPostIcons) {
            return [
              h(
                'button',
                {
                  type: 'button',
                  class:
                    'cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button',
                  'aria-label': 'Clear input',
                },
                [iconInfo()],
              ),
              h(
                'button',
                {
                  type: 'button',
                  class:
                    'cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button',
                  'aria-label': 'More info',
                },
                [iconSearch()],
              ),
            ];
          }

          return iconInfo();
        };
      }

      if (args.showInfo) {
        slots.info = () =>
          h(
            'a',
            {
              class: 'cdr-link cdr-link--standalone',
              href: '#',
            },
            args.infoText,
          );
      }

      if (args.showInfoAction) {
        slots['info-action'] = () =>
          h(
            'button',
            {
              type: 'button',
              class:
                'cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button',
              'aria-label': 'More info',
            },
            [iconInfo()],
          );
      }

      const wrapperStyle =
        args.background === 'secondary'
          ? {
              background: 'var(--cdr-color-background-input-default-active)',
              padding: '16px',
              borderRadius: '12px',
            }
          : undefined;

      const inputNode = h(C1Input, inputProps, slots);
      const panel = wrapperStyle
        ? h('div', { style: wrapperStyle }, [inputNode])
        : inputNode;

      return h(
        'div',
        {
          style: {
            display: 'grid',
            gap: '16px',
            maxWidth: '520px',
          },
        },
        [panel],
      );
    };
  },
});

const meta = {
  component: C1Input,
  title: 'Vue/Forms/Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  decorators: [
    () => ({
      template: '<div style="margin: 3em;"><story/></div>',
    }),
  ],
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

export const HelperTextTopOnly: Story = {
  args: {
    ...InputArgsData,
    helperTextTop: 'Helper text above the field.',
  },
};

export const HelperTextBottomOnly: Story = {
  args: {
    ...InputArgsData,
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

export const Numeric: Story = {
  args: {
    ...InputArgsData,
    numeric: true,
    type: 'text',
    label: 'Card number',
  },
};

export const HiddenLabelSearch: Story = {
  args: {
    ...InputArgsData,
    hideLabel: true,
    type: 'search',
    label: 'Search',
  },
};

export const Multiline: Story = {
  args: {
    ...InputArgsData,
    rows: 4,
  },
};

export const Date: Story = {
  args: {
    ...InputArgsData,
    type: 'date',
    label: 'Choose a date',
  },
};

export const Large: Story = {
  args: {
    ...InputArgsData,
    size: 'large',
    label: 'Large input label',
  },
};

export const Disabled: Story = {
  args: {
    ...InputArgsData,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    ...InputArgsData,
    required: true,
  },
};

export const Optional: Story = {
  args: {
    ...InputArgsData,
    optional: true,
  },
};

export const SecondaryBackground: Story = {
  args: {
    ...InputArgsData,
    background: 'secondary',
  },
};
