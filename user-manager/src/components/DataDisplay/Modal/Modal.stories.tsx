import type { Meta, StoryObj } from '@storybook/react';

// Components
import Modal from '@components/DataDisplay/Modal/index';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { description: 'One boolean to test for open or close modal.' },
    modalTitle: {description: 'Title of modal'},
    modalDesc: { description: 'Description of modal.' },
    type: { description: 'Type of modal.' },
    confirmText: { description: 'Type text button to confirm.' },
    denyText: { description: 'Type text button to deny.' }
  }
} as Meta;

type Story = StoryObj<typeof Modal>;

export const ModalSubmit: Story = {
  args: {
    isOpen: false,
    modalDesc: 'Enter user name',
    type: 'submit',
    confirmText: 'Save'
  }
};

export const ConfirmDialog: Story = {
  args: {
    isOpen: false,
    modalTitle: 'Delete',
    modalDesc: 'Are you sure to delete this user?',
    type: 'confirm',
    confirmText: 'Delete',
    denyText: 'Cancel'
  }
};
