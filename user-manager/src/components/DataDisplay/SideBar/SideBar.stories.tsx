import type { Meta, StoryObj } from '@storybook/react';

// Components
import SideBar from '@components/DataDisplay/SideBar/index';

// Helpers
import { getRandomColor } from '@helpers/getRandomColor';
import { formatDate } from '@helpers/formatDate';

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
        type: 'textView',
        icon: 'email-icon',
        title: 'Email:',
        content: ''
      },
      {
        type: 'textView',
        icon: 'date-icon',
        title: 'Last visited:',
        content: formatDate(new Date().toISOString())
      },
      {
        type: 'listView',
        icon: 'date-icon',
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
};
