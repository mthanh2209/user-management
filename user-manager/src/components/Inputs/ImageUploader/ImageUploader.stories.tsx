import type { Meta, StoryObj } from '@storybook/react';

// Components
import ImageUploader from '@components/Inputs/ImageUploader';

// Helpers
import { getRandomColor } from '@helpers';

// Icons
import uploadIcon from '@assets/images/upload-icon.svg';

export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
  argTypes: {
    initialImage: { description: 'The image source.' },
    alt: { description: 'Content of initial avatar.' },
    bgColor: { description: 'A randomly generated background color.' },
    buttonContent: { description: 'Content of button uploader.' },
    icon: { description: 'The icon source.' }
  }
} as Meta;

type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {
  args: {
    initialImage: '',
    alt: 'User',
    bgColor: getRandomColor(),
    buttonContent: 'Upload new photo',
    icon: uploadIcon
  }
};

export const ImageUploaded: Story = {
  ...Default,
  args: {
    ...Default.args,
    initialImage: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
  }
};
