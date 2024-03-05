import type { Meta, StoryObj } from '@storybook/react';

// Components
import {
  AssignRule,
  AssignRole,
  EditorProfile,
  Panel
} from '@components';

// Helpers
import { getRandomColor } from '@helpers';

// Mocks
import { mockData } from '@mocks';

// Types
import { ItemAssign } from '@types';

export default {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'List of tabs, each tab will contain different content.'
    }
  }
} as Meta;

type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    tabs: [
      {
        title: 'General',
        content: (
          <EditorProfile
            id={1}
            avatar={''}
            fullName={'Username'}
            email={''}
            isActive={true}
            registeredDate={null}
            lastVisitedDate={null}
            details={''}
            bgColor={getRandomColor()}
            onSaveUser={() => {}}
            onDeleteUser={() => {}}
            showToast={() => {}}
          />
        )
      },
      {
        title: 'Rules',
        content: (
          <AssignRule
            title='Username'
            rules={mockData.rules as ItemAssign[]}
          />
        )
      },
      {
        title: 'Roles',
        content: (
          <AssignRole
            title='Username'
            roles={mockData.roles as ItemAssign[]}
          />
        )
      }
    ]
  }
};
