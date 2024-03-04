import type { Meta, StoryObj } from '@storybook/react';

// Component
import EditorRole from '@components/DataDisplay/EditorRole';

export default {
  title: 'Components/EditorRole',
  component: EditorRole,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'The unique identifier for the role profile.'
    },
    name: {
      description: 'The name of the role.'
    },
    bgColor: {
      description: 'The background color of the user avatar.'
    }
  }
} as Meta;
type Story = StoryObj<typeof EditorRole>;

export const Default: Story = {
  args: {
    id: 1,
    name: 'Admin',
    bgColor: '#000'
  }
};
