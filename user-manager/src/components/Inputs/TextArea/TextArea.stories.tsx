import type { Meta, StoryObj } from '@storybook/react';

// Components
import TextArea from '@components/Inputs/TextArea/index';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    value: { description: 'The content inside the text area.' },
    placeholder: { description: 'Content of text area.' }
  }
} as Meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Details'
  }
};
