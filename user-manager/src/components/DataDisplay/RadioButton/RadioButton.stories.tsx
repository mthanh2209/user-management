import type { Meta, StoryObj } from '@storybook/react';

// Components
import RadioButton from '@components/DataDisplay/RadioButton/index';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    id: { description: 'The unique identifier for the radio button.' },
    name: { description: 'The name of the radio button group.' },
    label: { description: 'The label text for the radio button.' },
    isChecked: {
      description: 'Indicates whether the radio button is checked.'
    },
    onChange: {
      description:
        'Callback function triggered when the radio button is changed.'
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
