import type { Meta, StoryObj } from '@storybook/vue3';
import CedarButtonFixture from '../components/CedarButtonFixture.vue';
import CedarContainerFixture from '../components/CedarContainerFixture.vue';
import CedarLinkFixture from '../components/CedarLinkFixture.vue';
import CedarTextFixture from '../components/CedarTextFixture.vue';

const meta: Meta = {
  title: 'Vue Fixtures',
};

export default meta;

type Story = StoryObj;

export const Button: Story = {
  render: () => ({
    components: { CedarButtonFixture },
    template: '<CedarButtonFixture />',
  }),
};

export const Container: Story = {
  render: () => ({
    components: { CedarContainerFixture },
    template: '<CedarContainerFixture />',
  }),
};

export const Link: Story = {
  render: () => ({
    components: { CedarLinkFixture },
    template: '<CedarLinkFixture />',
  }),
};

export const Text: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture />',
  }),
};

export const TextBase: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="base" />',
  }),
};

export const TextDefaults: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="defaults" />',
  }),
};

export const TextHeadingDisplay: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="heading-display" />',
  }),
};

export const TextHeadingSans: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="heading-sans" />',
  }),
};

export const TextHeadingSerif: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="heading-serif" />',
  }),
};

export const TextSubheadingSans: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="subheading-sans" />',
  }),
};

export const TextBody: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="body" />',
  }),
};

export const TextUtilitySans: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="utility-sans" />',
  }),
};

export const TextUtilitySerif: Story = {
  render: () => ({
    components: { CedarTextFixture },
    template: '<CedarTextFixture section="utility-serif" />',
  }),
};
