import type { Meta, StoryObj } from '@storybook/react';

// Components
import {
  Table,
  Avatar,
  Status
} from '@components';

// Helpers
import { getRandomColor } from '@helpers/string';

// Interfaces
import { IUser } from '@types';
import { IColumnProps } from '@types';

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    rowData: { description: 'List containing user information.' },
    columns: { description: 'List containing table columns.' },
    additionalClass: {
      description: 'Adds the additional class to the avatar.',
      table: {
        defaultValue: { summary: 'table-row-selected' }
      }
    },
    selectedRowIndex: { description: 'Number of the selected table row.' }
  }
} as Meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    rowData: [
      {
        id: 1,
        avatar: '',
        fullName: 'User',
        email: 'user@example.com',
        isActive: true,
        bgColor: getRandomColor()
      },
      {
        id: 2,
        avatar: '',
        fullName: 'Member',
        email: 'member@example.com',
        isActive: false,
        bgColor: getRandomColor()
      }
    ],
    columns: [
      {
        key: 'avatar',
        title: '',
        render: (_, item: IUser) => (
          <Avatar
            src={item.avatar}
            alt={item.fullName}
            bgColor={item.bgColor}
            size='sm'
          />
        )
      },
      {
        key: 'fullName',
        title: 'Full Name'
      },
      {
        key: 'isActive',
        title: 'Status',
        render: (_, item: IUser) => <Status isActive={item.isActive} />
      },
      {
        key: 'email',
        title: 'Email'
      }
    ] as IColumnProps<unknown>[]
  }
};

export const UserSelected: Story = {
  ...Default,
  args: {
    ...Default.args,
    selectedRowIndex: 1
  }
};
