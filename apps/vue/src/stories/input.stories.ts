import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { C1IconInformationStroke, C1IconSearch } from '@rei/c1-icons/vue';
import { computed, ref, watch } from 'vue';

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

const renderInput = (args: InputStoryArgs) => ({
  components: { C1Input, C1IconInformationStroke, C1IconSearch },
  setup() {
    const modelValue = ref(args.modelValue ?? '');

    watch(
      () => args.modelValue,
      (nextValue) => {
        modelValue.value = nextValue ?? '';
      },
    );

    const errorValue = computed(() =>
      args.error ? args.errorMessage || true : false,
    );
    const normalizedSize = computed(() => args.size || undefined);
    const normalizedRows = computed(() => args.rows || 1);
    const wrapperClass = computed(() =>
      args.background === 'secondary'
        ? 'c1-story-bg-input-active c1-story-pad-16 c1-story-radius-12'
        : undefined,
    );

    return {
      args,
      modelValue,
      errorValue,
      normalizedSize,
      normalizedRows,
      wrapperClass,
    };
  },
  template: `
    <div class="c1-story-grid c1-story-gap-16 c1-story-max-520">
      <div v-if="wrapperClass" :class="wrapperClass">
        <C1Input
          :label="args.label"
          :type="args.type"
          :background="args.background"
          :size="normalizedSize"
          :rows="normalizedRows"
          :required="args.required"
          :optional="args.optional"
          :disabled="args.disabled"
          :hide-label="args.hideLabel"
          :numeric="args.numeric"
          :error="errorValue"
          :post-icons="args.showPostIcons"
          v-model="modelValue"
        >
          <template v-if="args.helperTextTop" #helper-text-top>
            {{ args.helperTextTop }}
          </template>
          <template v-if="args.helperTextBottom" #helper-text-bottom>
            {{ args.helperTextBottom }}
          </template>
          <template v-if="args.showPreIcon" #pre-icon>
            <C1IconSearch inherit-color focusable="false" />
          </template>
          <template v-if="args.showPostIcon || args.showPostIcons" #post-icon>
            <template v-if="args.showPostIcons">
              <button
                type="button"
                class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
                aria-label="Clear input"
              >
                <C1IconInformationStroke inherit-color focusable="false" />
              </button>
              <button
                type="button"
                class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
                aria-label="More info"
              >
                <C1IconSearch inherit-color focusable="false" />
              </button>
            </template>
            <C1IconInformationStroke
              v-else
              inherit-color
              focusable="false"
            />
          </template>
          <template v-if="args.showInfo" #info>
            <a class="cdr-link cdr-link--standalone" href="#">
              {{ args.infoText }}
            </a>
          </template>
          <template v-if="args.showInfoAction" #info-action>
            <button
              type="button"
              class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
              aria-label="More info"
            >
              <C1IconInformationStroke inherit-color focusable="false" />
            </button>
          </template>
        </C1Input>
      </div>
      <C1Input
        v-else
        :label="args.label"
        :type="args.type"
        :background="args.background"
        :size="normalizedSize"
        :rows="normalizedRows"
        :required="args.required"
        :optional="args.optional"
        :disabled="args.disabled"
        :hide-label="args.hideLabel"
        :numeric="args.numeric"
        :error="errorValue"
        :post-icons="args.showPostIcons"
        v-model="modelValue"
      >
        <template v-if="args.helperTextTop" #helper-text-top>
          {{ args.helperTextTop }}
        </template>
        <template v-if="args.helperTextBottom" #helper-text-bottom>
          {{ args.helperTextBottom }}
        </template>
        <template v-if="args.showPreIcon" #pre-icon>
          <C1IconSearch inherit-color focusable="false" />
        </template>
        <template v-if="args.showPostIcon || args.showPostIcons" #post-icon>
          <template v-if="args.showPostIcons">
            <button
              type="button"
              class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
              aria-label="Clear input"
            >
              <C1IconInformationStroke inherit-color focusable="false" />
            </button>
            <button
              type="button"
              class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
              aria-label="More info"
            >
              <C1IconSearch inherit-color focusable="false" />
            </button>
          </template>
          <C1IconInformationStroke
            v-else
            inherit-color
            focusable="false"
          />
        </template>
        <template v-if="args.showInfo" #info>
          <a class="cdr-link cdr-link--standalone" href="#">
            {{ args.infoText }}
          </a>
        </template>
        <template v-if="args.showInfoAction" #info-action>
          <button
            type="button"
            class="cdr-button cdr-button--primary cdr-button--icon-only cdr-input__button"
            aria-label="More info"
          >
            <C1IconInformationStroke inherit-color focusable="false" />
          </button>
        </template>
      </C1Input>
    </div>
  `,
});

const meta = {
  component: C1Input,
  title: 'Vue/Forms/Input',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  decorators: [
    () => ({
      template: '<div class="c1-story-margin-3em"><story/></div>',
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
