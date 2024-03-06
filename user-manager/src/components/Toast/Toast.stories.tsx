import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Toast } from '@components';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: { description: 'Type of the toasts.' },
    position: { description: 'Position of the toasts on the screen.' }
  }
} as Meta;

type Story = StoryObj<typeof Toast>;

export const SuccessToast: Story = {
  args: {
    type: 'success'
  }
};

export const FailToast: Story = {
  args: {
    type: 'error'
  }
};
