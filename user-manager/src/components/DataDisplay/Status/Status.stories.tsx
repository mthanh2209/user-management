import type { Meta, StoryObj } from '@storybook/react';

// Components
import Status from '@components/DataDisplay/Status/index';

export default {
  title: 'Components/Status',
  component: Status,
  tags: ['autodocs'],
  argTypes: {
    isActive: { description: 'One boolean to test for active or notActive.' },
    active: { description: 'Content of active.' },
    notActive: { description: 'Content of not active.' }
  }
} as Meta;

type Story = StoryObj<typeof Status>;

export const Default: Story = {
  args: {
    isActive: true,
    active: 'Active',
    notActive: 'Not active'
  },
};
