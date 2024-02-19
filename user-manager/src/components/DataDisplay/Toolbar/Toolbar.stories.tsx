import type { Meta, StoryObj } from '@storybook/react';

// Components
import Toolbar from '@components/DataDisplay/Toolbar/index';

// Icons
import searchIcon from '@assets/images/search-icon.svg';

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    icon: { description: 'The icon source.' },
    content: { description: 'Content of Toolbar.' }
  }
} as Meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {
    icon: searchIcon,
    content: 'Users'
  }
};
