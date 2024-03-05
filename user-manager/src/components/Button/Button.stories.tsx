import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Button } from '@components';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variants: { description: 'The variants of button.' },
    size: { description: 'The size of button' },
    additionalClass: { description: 'Add class to the button' },
    children: { description: 'The content of button.' }
  }
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variants: 'primary',
    size: 'lg',
    children: 'Save'
  }
};
