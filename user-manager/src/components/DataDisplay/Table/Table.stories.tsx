import type { Meta, StoryObj } from '@storybook/react';

// Components
import Table from '@components/DataDisplay/Table/index';
import Avatar from '@components/DataDisplay/Avatar';
import Status from '@components/DataDisplay/Status';

// Helpers
import { getRandomColor } from '@helpers/getRandomColor';

// Interfaces
import { IUserProps } from '@types';
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
        render: (_, item: IUserProps) => (
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
        render: (_, item: IUserProps) => <Status isActive={item.isActive} />
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
