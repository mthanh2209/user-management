import type { Meta, StoryObj } from '@storybook/react';

// Components
import TextField from '@components/Inputs/TextField/index';

export default {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    isShowLabel: {
      description: 'One boolean to test for open or close label of input.'
    },
    label: { description: 'Content of label.' },
    validate: { description: 'Validation of input.' },
    additionalClass: {
      description: 'Adds the additional class to the avatar.'
    },
    placeholder: { description: 'Content of text field.' }
  }
} as Meta;
type Story = StoryObj<typeof TextField>;

const isValid = (value: string): string | undefined => {
  if (!value.trim()) {
    return 'The field is required';
  }
  return undefined;
};

export const Default: Story = {
  args: {
    isShowLabel: true,
    label: 'Label',
    additionalClass: 'input-search',
    placeholder: 'Full Name',
    validate: isValid
  }
};
