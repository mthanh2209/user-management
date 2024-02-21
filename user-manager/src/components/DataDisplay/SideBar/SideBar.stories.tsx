import type { Meta, StoryObj } from '@storybook/react';

// Components
import SideBar from '@components/DataDisplay/SideBar/index';

// Helpers
import { getRandomColor } from '@helpers/getRandomColor';
import { formatDate } from '@helpers/formatDate';

// Constants
import { INFO_TYPE } from '@constants';

export default {
  title: 'Components/SideBar',
  component: SideBar,
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

type Story = StoryObj<typeof SideBar>;

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
        title: 'Last visited:',
        content: formatDate(new Date().toISOString())
      },
      // {
      //   type: INFO_TYPE.LIST_VIEW,
      //   icon: 'icon-date',
      //   title: 'Roles',
      //   content: [
      //     {
      //       text: 'Admin',
      //       link: '/'
      //     }
      //   ]
      // }
    ]
  }
};
