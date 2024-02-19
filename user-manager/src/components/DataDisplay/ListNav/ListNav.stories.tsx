import type { Meta, StoryObj } from '@storybook/react';

// Components
import ListNav from '@components/DataDisplay/ListNav/index';

export default {
  title: 'Components/ListNav',
  component: ListNav,
  tags: ['autodocs'],
  argTypes: {
    items: { description: 'List of nav items' }
  }
} as Meta;

type Story = StoryObj<typeof ListNav>;

export const Default: Story = {
  args: {
    items: [
      { id: 0, label: 'users' },
      { id: 1, label: 'roles' },
      { id: 2, label: 'rules' }
    ]
  }
};
