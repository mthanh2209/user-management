import type { Meta, StoryObj } from '@storybook/react';

// Components
import Drawer from '@components/DataDisplay/Drawer/index';

// Icons
import plusIcon from '@assets/images/plus-icon.svg';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    icon: { description: 'The icon source.' },
    popperOption: { description: 'Popper options that can be pointed to.' },
    anchor: { description: 'Drawer positions.' },
    text: { description: 'Content of popper options.' }
  }
} as Meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  args: {
    icon: plusIcon,
    popoverOption: [
      {
        text: 'Add new user',
        label: 'Enter user name',
        onClick: () => {}
      },
      {
        text: 'Add new role',
        label: 'Enter role name',
        onClick: () => {}
      }
    ],
    items: [
      {
        id: 0,
        label: 'users'
      },
      {
        id: 1,
        label: 'roles'
      },
      {
        id: 2,
        label: 'rules'
      }
    ]
  }
};
