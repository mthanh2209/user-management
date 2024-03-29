import type { Meta, StoryObj } from '@storybook/react';

// Components
import { InformationSidebar } from '@components';

// Helpers
import { getRandomColor } from '@helpers/string';
import { formatDate } from '@helpers/object';

// Constants
import { INFO_TYPE } from '@constants';

export default {
  title: 'Components/SideBar',
  component: InformationSidebar,
  tags: ['autodocs'],
  argTypes: {
    title: { description: 'Title of Sidebar.' },
    isActive: { description: 'One boolean to test for active or notActive.' },
    src: { description: 'The image source.' },
    bgColor: { description: 'A randomly generated background color.' },
    fullName: { description: 'Text FullName of user.' },
    data: { description: 'List of information of user.' }
  }
} as Meta;

type Story = StoryObj<typeof InformationSidebar>;

export const Default: Story = {
  args: {
    title: 'User information',
    isActive: true,
    bgColor: getRandomColor(),
    fullName: 'UserName',
    data: [
      {
        type: INFO_TYPE.TEXT_VIEW,
        icon: 'icon-email',
        title: 'Email:',
        content: ''
      },
      {
        type: INFO_TYPE.TEXT_VIEW,
        icon: 'icon-date',
        title: 'Last Modified:',
        content: formatDate(new Date().toISOString())
      },
      {
        type: INFO_TYPE.LIST_VIEW,
        content: [
          {
            icon: 'icon-role',
            title: 'Roles',
            content: [
              {
                text: 'Admin',
                link: '/'
              }
            ]
          }
        ]
      }
    ]
  }
};
