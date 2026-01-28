import type { Meta, StoryObj } from '@storybook/vue3';
import CedarButtonFixture from '../components/CedarButtonFixture.vue';
import CedarContainerFixture from '../components/CedarContainerFixture.vue';
import CedarLinkFixture from '../components/CedarLinkFixture.vue';

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
