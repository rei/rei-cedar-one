import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref, watch } from 'vue';

import C1Accordion from '../components/accordion';
import C1AccordionGroup from '../components/accordion-group';

export const AccordionArgsData = {
  id: 'accordion-base',
  label: 'Accordion label',
  opened: false,
  compact: false,
  borderAligned: false,
  contentSpacing: true,
  level: 3,
};

export type AccordionStoryArgs = typeof AccordionArgsData & {
  unwrap?: boolean;
};

const renderAccordion = (args: unknown, context: unknown) => {
  const typedArgs = args as typeof AccordionArgsData;
  const updateArgs = (
    context as {
      updateArgs?: (nextArgs: Partial<typeof AccordionArgsData>) => void;
    }
  )?.updateArgs;
  return {
    components: { C1Accordion },
    setup() {
      const isOpen = ref(typedArgs.opened);

      watch(
        () => typedArgs.opened,
        (nextValue) => {
          isOpen.value = nextValue;
        },
      );

      const onToggle = () => {
        isOpen.value = !isOpen.value;
        updateArgs?.({ opened: isOpen.value });
      };

      return {
        args: typedArgs,
        isOpen,
        onToggle,
      };
    },
    template: `
      <div class="c1-story-grid c1-story-gap-16 c1-story-max-640">
        <C1Accordion
          :id="args.id"
          :label="args.label"
          :opened="isOpen"
          :compact="args.compact"
          :border-aligned="args.borderAligned"
          :content-spacing="args.contentSpacing"
          :level="args.level"
          @accordion-toggle="onToggle"
        >
          <p class="cdr-text">
            Use accordions to reveal supplemental content without leaving the
            current page context.
          </p>
        </C1Accordion>
      </div>
    `,
  };
};

const renderGroup = (args: unknown) => {
  const typedArgs = args as AccordionStoryArgs;
  return {
    components: { C1Accordion, C1AccordionGroup },
    setup() {
      const firstOpen = ref(true);
      const secondOpen = ref(false);

      watch(
        () => typedArgs.opened,
        (nextValue) => {
          firstOpen.value = nextValue;
        },
      );

      return {
        args: typedArgs,
        firstOpen,
        secondOpen,
      };
    },
    template: `
    <div class="c1-story-grid c1-story-gap-16 c1-story-max-640">
      <C1AccordionGroup :unwrap="args.unwrap">
        <C1Accordion
          id="accordion-first"
          label="First accordion"
          :opened="firstOpen"
          :compact="args.compact"
          :border-aligned="args.borderAligned"
          :content-spacing="args.contentSpacing"
          :level="args.level"
          @accordion-toggle="firstOpen = !firstOpen"
        >
          <p class="cdr-text">
            The group adapter handles roving focus and unwrap behavior.
          </p>
        </C1Accordion>
        <C1Accordion
          id="accordion-second"
          label="Second accordion"
          :opened="secondOpen"
          :compact="args.compact"
          :border-aligned="args.borderAligned"
          :content-spacing="args.contentSpacing"
          :level="args.level"
          @accordion-toggle="secondOpen = !secondOpen"
        >
          <p class="cdr-text">
            Accordions can be collapsed independently.
          </p>
        </C1Accordion>
      </C1AccordionGroup>
    </div>
  `,
  };
};

const meta = {
  component: C1Accordion,
  title: 'Vue/Disclosure/Accordion',
  tags: ['autodocs'],
  excludeStories: /.*ArgsData$/,
  parameters: {
    layout: 'padded',
  },
  args: {
    ...AccordionArgsData,
  },
  argTypes: {
    id: { control: 'text', table: { category: 'Props' } },
    label: { control: 'text', table: { category: 'Props' } },
    opened: { control: 'boolean', table: { category: 'Props' } },
    compact: { control: 'boolean', table: { category: 'Props' } },
    borderAligned: { control: 'boolean', table: { category: 'Props' } },
    contentSpacing: { control: 'boolean', table: { category: 'Props' } },
    level: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      table: { category: 'Props' },
    },
  },
} satisfies Meta<typeof C1Accordion>;

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const Base: Story = {
  render: renderAccordion,
};

export const Opened: Story = {
  render: renderAccordion,
  args: {
    opened: true,
  },
};

export const Compact: Story = {
  render: renderAccordion,
  args: {
    compact: true,
  },
};

export const BorderAligned: Story = {
  render: renderAccordion,
  args: {
    borderAligned: true,
  },
};

export const NoSpacing: Story = {
  render: renderAccordion,
  args: {
    contentSpacing: false,
  },
};

export const Group: Story = {
  render: renderGroup,
  args: {
    unwrap: false,
  },
  argTypes: {
    unwrap: { control: 'boolean', table: { category: 'Story' } },
  },
};

export const GroupUnwrapped: Story = {
  render: renderGroup,
  args: {
    unwrap: true,
  },
  argTypes: {
    unwrap: { control: 'boolean', table: { category: 'Story' } },
  },
};
