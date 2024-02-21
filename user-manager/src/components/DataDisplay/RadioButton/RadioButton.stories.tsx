import type { Meta, StoryObj } from '@storybook/react';

// Components
import RadioButton from '@components/DataDisplay/RadioButton/index';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
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

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    id: 'assigned directly',
    name: 'rule',
    label: 'Assigned directly',
    isChecked: true
  }
};
