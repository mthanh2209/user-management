import type { Meta, StoryObj } from '@storybook/react';

// Components
import Panel from '@components/DataDisplay/Panel/index';
import EditorProfile from '@components/DataDisplay/EditorProfile';

// Helpers
import { getRandomColor } from '@helpers/getRandomColor';
import AssignRule from '../Assign/AssignRule';
import AssignRole from '../Assign/AssignRole';

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
            rules={[
              {
                id: 1,
                name: 'CanAdminProjects',
                description: 'Can create projects',
                isAssigned: true,
                isAssignedDirectly: true,
                assignedTo: [
                  {
                    id: 2,
                    name: 'Admin'
                  }
                ]
              }
            ]}
          />
        )
      },
      {
        title: 'Roles',
        content: (
          <AssignRole
            title='Username'
            roles={[
              {
                id: 1,
                name: 'Admin',
                bgColor: getRandomColor(),
                isAssigned: true,
                assignedTo: [{ id: 2, name: 'Admin' }]
              }
            ]}
          />
        )
      }
    ]
  }
};
