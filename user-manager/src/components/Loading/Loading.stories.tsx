import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Loading } from '@components';

export default {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    isProcessing: { description: 'The process of the loading' }
  }
} as Meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    isProcessing: true
  }
};
