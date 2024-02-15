import type { Meta, StoryObj } from '@storybook/react';

// Components
import Popover from '@components/DataDisplay/Popover/index';

// Icons
import plusIcon from '@assets/images/plus-icon.svg';

export default {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { description: 'One boolean to test for open or close popper options.' },
    icon: { description: 'The icon source.' },
    children: { description: 'Content of Popper.' },
    options: { description: 'List of Popper options.' }
  }
} as Meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    isOpen: false,
    icon: plusIcon,
    children: 'New',
    options: [
      {
        text: 'Add new user',
      },
      {
        text: 'Add new role',
      }
    ]
  }
};
