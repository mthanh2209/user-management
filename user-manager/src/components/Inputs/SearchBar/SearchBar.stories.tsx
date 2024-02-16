import type { Meta, StoryObj } from '@storybook/react';

// Components
import SearchBar from '@components/Inputs/SearchBar/index';

// Icons
import closeIcon from '@assets/images/close-icon.svg';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    icon: { description: 'The icon source.' },
    placeholder: { description: 'Content of search bar.' },
  }
} as Meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    icon: closeIcon,
    placeholder: 'Search',
  },
};
