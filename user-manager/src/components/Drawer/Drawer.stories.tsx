import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Drawer } from '@components';

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
    items: [
      {
        id: 0,
        label: 'users',
        onClick: () => {}
      },
      {
        id: 1,
        label: 'roles',
        onClick: () => {}
      },
      {
        id: 2,
        label: 'rules',
        onClick: () => {}
      }
    ]
  }
};
