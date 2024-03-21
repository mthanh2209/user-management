import type { Meta, StoryObj } from '@storybook/react';

// Components
import {
  AssignUserRules,
  AssignUserRoles,
  EditorProfile,
  Panel
} from '@components';

// Helpers
import { getRandomColor } from '@helpers/string';

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
            lastModifiedDate={null}
            details={''}
            bgColor={getRandomColor()}
            onSaveUser={() => {}}
            onDeleteUser={() => {}}
          />
        )
      },
      {
        title: 'Rules',
        content: (
          <AssignUserRules
            title='Username'
            items={mockData.rules as ItemAssign[]}
          />
        )
      },
      {
        title: 'Roles',
        content: (
          <AssignUserRoles
            title='Username'
            items={mockData.roles as ItemAssign[]}
          />
        )
      }
    ]
  }
};
