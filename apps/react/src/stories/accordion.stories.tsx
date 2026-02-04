import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState, type ReactNode } from 'react';

import C1Accordion from '../components/accordion';
import C1AccordionGroup from '../components/accordion-group';

type AccordionStoryArgs = {
  id: string;
  label?: ReactNode;
  opened?: boolean;
  compact?: boolean;
  borderAligned?: boolean;
  contentSpacing?: boolean;
  level: number | string;
  unwrap?: boolean;
};

export const AccordionArgsData: AccordionStoryArgs = {
  id: 'accordion-base',
  label: 'Accordion label',
  opened: false,
  compact: false,
  borderAligned: false,
  contentSpacing: true,
  level: 3,
};

export const AccordionGroupArgsData: AccordionStoryArgs = {
  ...AccordionArgsData,
  unwrap: false,
};

const renderAccordion = (args: AccordionStoryArgs, context: unknown) => {
  const updateArgs = (
    context as { updateArgs?: (nextArgs: Partial<AccordionStoryArgs>) => void }
  )?.updateArgs;
  const [open, setOpen] = useState(args.opened ?? false);

  useEffect(() => {
    setOpen(args.opened ?? false);
  }, [args.opened]);

  const handleToggle = () => {
    setOpen((prev) => {
      const nextValue = !prev;
      updateArgs?.({ opened: nextValue });
      return nextValue;
    });
  };

  return (
    <div className="c1-story-grid c1-story-gap-16 c1-story-max-640">
      <C1Accordion
        id={args.id}
        label={args.label}
        opened={open}
        compact={args.compact ?? false}
        borderAligned={args.borderAligned ?? false}
        contentSpacing={args.contentSpacing ?? true}
        level={args.level}
        onAccordionToggle={handleToggle}
      >
        <p className="cdr-text">
          Use accordions to reveal supplemental content without leaving the
          current page context.
        </p>
      </C1Accordion>
    </div>
  );
};

const GroupStory = (args: AccordionStoryArgs) => {
  const [firstOpen, setFirstOpen] = useState(true);
  const [secondOpen, setSecondOpen] = useState(false);

  useEffect(() => {
    setFirstOpen(args.opened ?? true);
  }, [args.opened]);

  return (
    <div className="c1-story-grid c1-story-gap-16 c1-story-max-640">
      <C1AccordionGroup unwrap={args.unwrap ?? false}>
        <C1Accordion
          id="accordion-first"
          label="First accordion"
          opened={firstOpen}
          compact={args.compact ?? false}
          borderAligned={args.borderAligned ?? false}
          contentSpacing={args.contentSpacing ?? true}
          level={args.level ?? 3}
          onAccordionToggle={() => setFirstOpen((prev) => !prev)}
        >
          <p className="cdr-text">
            The group adapter handles roving focus and unwrap behavior.
          </p>
        </C1Accordion>
        <C1Accordion
          id="accordion-second"
          label="Second accordion"
          opened={secondOpen}
          compact={args.compact ?? false}
          borderAligned={args.borderAligned ?? false}
          contentSpacing={args.contentSpacing ?? true}
          level={args.level ?? 3}
          onAccordionToggle={() => setSecondOpen((prev) => !prev)}
        >
          <p className="cdr-text">Accordions can be collapsed independently.</p>
        </C1Accordion>
      </C1AccordionGroup>
    </div>
  );
};

const meta = {
  component: C1Accordion,
  title: 'React/Disclosure/Accordion',
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
  render: (args) => <GroupStory {...args} />,
  args: {
    unwrap: false,
  },
  argTypes: {
    unwrap: { control: 'boolean', table: { category: 'Story' } },
  },
};

export const GroupUnwrapped: Story = {
  render: (args) => <GroupStory {...args} />,
  args: {
    unwrap: true,
  },
  argTypes: {
    unwrap: { control: 'boolean', table: { category: 'Story' } },
  },
};
