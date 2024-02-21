import type { Meta, StoryObj } from '@storybook/react';

// Components
import Toast from '@components/DataDisplay/Toast/index';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    isError: { description: 'One boolean to test for error or success.' },
    failMessage: { description: 'Content of the fail message.' },
    successMessage: { description: 'Content of the success message.' }
  }
} as Meta;

type Story = StoryObj<typeof Toast>;

export const SuccessToast: Story = {
  args: {
    isError: false
  }
};

export const FailToast: Story = {
  args: {
    isError: true
  }
};
