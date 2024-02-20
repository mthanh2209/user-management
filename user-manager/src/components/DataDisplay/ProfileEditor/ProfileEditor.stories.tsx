import type { Meta, StoryObj } from '@storybook/react';

// Components
import ProfileEditor from '@components/DataDisplay/ProfileEditor';

// Helpers
import { getRandomColor } from '@helpers/getRandomColor';

export default {
  title: 'Components/ProfileEditor',
  component: ProfileEditor,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'List of tabs, each tab will contain different content.'
    }
  }
} as Meta;

type Story = StoryObj<typeof ProfileEditor>;

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
