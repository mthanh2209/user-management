import type { Meta, StoryObj } from '@storybook/react';

// Components
import Modal from '@components/Modal';
import { ModalConfirm, ModalFormInput } from '@components';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    children: { description: 'Content to be displayed inside the modal.' }
  }
} as Meta;

type Story = StoryObj<typeof Modal>;

export const ModalSubmit: Story = {
  args: {
    children: (
      <ModalFormInput
        isOpen={true}
        modalTitle='Enter user name'
        confirmText='Save'
      />
    )
  }
};

export const ConfirmDialog: Story = {
  args: {
    children: (
      <ModalConfirm
        isOpen={true}
        modalTitle='Delete'
        modalDesc='Are you sure to delete this user?'
        confirmText='Delete'
        denyText='Cancel'
      />
    )
  }
};
