import { useState } from 'react';

// CSS
import '@components/Drawer/Drawer.css';

// Components
import {
  Popover,
  ListNav,
  ModalFormInput
} from '@components';

// Icons
import plusIcon from '@assets/images/plus-icon.svg';

// Types
import { IItemNav, IPopoverOption } from '@types';

type TAnchor = 'top' | 'left' | 'bottom' | 'right';

interface IDrawerProps {
  anchor?: TAnchor;
  text?: string;
  icon?: string;
  items: IItemNav[];
  onSubmit: (data: { type: string; value: string }) => void;
}

const Drawer = ({
  anchor = 'left',
  text = 'New',
  icon = plusIcon,
  items,
  onSubmit
}: IDrawerProps) => {
  const [type, setType] = useState('');
  const [isOpenModal, setOpenModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleInputChange = (value: string) => {
    setTextInput(value);
  };

  const handleToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const handleOnSubmit = () => {
    onSubmit({ type, value: textInput });
    setOpenModal(false);
  };

  const popoverOption: IPopoverOption[] = [
    {
      id: 1,
      label: 'Add new user',
      onClick: () => {
        setModalTitle('Enter user name');
        setType('user');
        handleToggleModal();
      }
    },
    {
      id: 2,
      label: 'Add new role',
      onClick: () => {
        setModalTitle('Enter role name');
        setType('role');
        handleToggleModal();
      }
    }
  ];

  return (
    <div className={`drawer-wrapper ${anchor}`}>
      <Popover
        icon={icon}
        children={text}
        options={popoverOption}
      />

      <ListNav items={items} />

      {isOpenModal && (
        <ModalFormInput
          isOpen={isOpenModal}
          modalTitle={modalTitle}
          confirmText='Save'
          onClose={handleToggleModal}
          onConfirmText={handleOnSubmit}
          onChangeText={handleInputChange}
        />
      )}
    </div>
  );
};

export default Drawer;
