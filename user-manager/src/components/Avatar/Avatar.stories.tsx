import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Avatar } from '@components';

// Helpers
import { getRandomColor } from '@helpers';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { description: 'The image source.' },
    alt: { description: 'An image with an alternate text specified.' },
    bgColor: { description: 'A randomly generated background color.' },
    size: {
      description: 'The size of avatar.',
      table: {
        defaultValue: { summary: 'avatar-sm' }
      }
    }
  }
} as Meta;

type Story = StoryObj<typeof Avatar>;

export const AvatarCircle: Story = {
  args: {
    alt: 'UserName',
    bgColor: getRandomColor(),
    size: 'sm'
  }
};

export const AvatarUploaded: Story = {
  ...AvatarCircle,
  args: {
    ...AvatarCircle.args,
    src: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp'
  }
};
