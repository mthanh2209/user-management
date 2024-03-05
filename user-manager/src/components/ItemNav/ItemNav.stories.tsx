import { Meta, StoryObj } from '@storybook/react';

// Components
import ItemNav from '@components/ItemNav';

// Icons
import userIconSelected from '@assets/images/user-icon-selected.svg';
import userIcon from '@assets/images/user-icon.svg';

export default {
  title: 'Components/ItemNav',
  component: ItemNav,
  tags: ['autodocs'],
  argTypes: {
    icon: { description: 'The icon source (default or selected).' },
    content: { description: 'Content of item.' },
    isSelected: {
      description: 'One boolean to test for selected and not selected.'
    },
    additionalClass: {
      description: 'Adds the additional class to the item.',
      table: {
        defaultValue: { summary: 'selected' }
      }
    }
  }
} as Meta;

type Story = StoryObj<typeof ItemNav>;

export const Default: Story = {
  args: {
    content: 'users',
    isSelected: false,
    icon: userIcon
  }
};

export const ItemNavSelected: Story = {
  args: {
    content: 'users',
    additionalClass: 'selected',
    isSelected: true,
    icon: userIconSelected
  }
};
