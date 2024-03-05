import type { Meta, StoryObj } from '@storybook/react';

// Components
import { EditorProfile } from '@components';

// Helpers
import { getRandomColor } from '@helpers';

export default {
  title: 'Components/EditorProfile',
  component: EditorProfile,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'The unique identifier for the user profile.'
    },
    avatar: {
      description: "The URL or path to the user's avatar image."
    },
    fullName: {
      description: 'The full name of the user.'
    },
    email: {
      description: 'The email address of the user.'
    },
    isActive: {
      description:
        'A boolean indicating whether the user profile is active or not.'
    },
    registeredDate: {
      description: 'The date when the user registered.'
    },
    lastVisitedDate: {
      description: 'The date when the user last visited.'
    },
    details: {
      description: 'Additional details or description about the user.'
    },
    bgColor: {
      description: 'The background color of the user profile.'
    },
    onSaveUser: {
      description: 'Callback function triggered when the user profile is saved.'
    },
    onDeleteUser: {
      description:
        'Callback function triggered when the user profile is deleted.'
    },
    showToast: {
      description: 'Function to show a toast or notification.'
    }
  }
} as Meta;

type Story = StoryObj<typeof EditorProfile>;

export const Default: Story = {
  args: {
    id: 1,
    avatar: '',
    fullName: 'Username',
    email: '',
    isActive: true,
    registeredDate: null,
    lastVisitedDate: null,
    details: '',
    bgColor: getRandomColor(),
    onSaveUser: () => {},
    onDeleteUser: () => {},
    showToast: () => {}
  }
};
