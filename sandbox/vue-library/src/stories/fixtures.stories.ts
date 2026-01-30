import type { Meta, StoryObj } from '@storybook/vue3';
import CedarButtonFixture from '../components/CedarButtonFixture.vue';
import CedarContainerFixture from '../components/CedarContainerFixture.vue';
import CedarImageFixture from '../components/CedarImageFixture.vue';
import CedarLinkFixture from '../components/CedarLinkFixture.vue';
import CedarProseFixture from '../components/CedarProseFixture.vue';
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

export const Image: Story = {
  render: () => ({
    components: { CedarImageFixture },
    template: '<CedarImageFixture />',
  }),
};

export const Link: Story = {
  render: () => ({
    components: { CedarLinkFixture },
    template: '<CedarLinkFixture />',
  }),
};

export const Prose: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture />',
  }),
};

export const ProseOverview: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="overview" />',
  }),
};

export const ProseSizes: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="sizes" />',
  }),
};

export const ProseMeasuredLineLength: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="measured-line-length" />',
  }),
};

export const ProseSerifHeadings: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="serif-headings" />',
  }),
};

export const ProseInvert: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="invert" />',
  }),
};

export const ProseEscapeHatch: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="escape-hatch" />',
  }),
};

export const ProseContentTypes: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="content-types" />',
  }),
};

export const ProseComponentMix: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="component-mix" />',
  }),
};

export const ProseEditorial: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="editorial" />',
  }),
};

export const ProseResponsiveMeasure: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="responsive-measure" />',
  }),
};

export const ProseDarkSurface: Story = {
  render: () => ({
    components: { CedarProseFixture },
    template: '<CedarProseFixture section="dark-surface" />',
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
