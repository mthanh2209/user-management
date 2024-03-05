import type { Meta, StoryObj } from '@storybook/react';

// Components
import { SwitchStatus } from '@components';

export default {
  title: 'Components/SwitchStatus',
  component: SwitchStatus,
  tags: ['autodocs'],
  argTypes: {
    isChecked: { description: 'One boolean to test for active or notActive.' }
  }
} as Meta;
type Story = StoryObj<typeof SwitchStatus>;

export const Default: Story = {
  args: {
    isChecked: false
  }
};
