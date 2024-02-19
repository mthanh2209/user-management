import { useState } from 'react';

// CSS
import '@components/DataDisplay/Drawer/Drawer.css';

// Components
import Popover from '@components/DataDisplay/Popover';
import ListNav from '@components/DataDisplay/ListNav';
import ModalFormInput from '@components/DataDisplay/Modal/ModalFormInput';

// Icons
import plusIcon from '@assets/images/plus-icon.svg';

// Types
import { IPopoverOption } from '@types';

type TAnchor = 'top' | 'left' | 'bottom' | 'right';

interface IDrawerProps {
  anchor?: TAnchor;
  text?: string;
  icon?: string;
  popoverOption: IPopoverOption[];
  onItemClick: () => void;
  onSubmit: (data: string) => void;
}

const Drawer = ({
  anchor = 'left',
  text = 'New',
  icon = plusIcon,
  popoverOption,
  onItemClick,
  onSubmit
}: IDrawerProps) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const handleInputChange = (value: string) => {
    setTextInput(value);
  };

  const handleOpenModal = (option: IPopoverOption) => {
    setModalTitle(option.label || '');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnSubmit = () => {
    onSubmit(textInput);
    setOpenModal(false);
  };

  return (
    <div className={`drawer-wrapper ${anchor}`}>
      <Popover
        icon={icon}
        children={text}
        options={popoverOption}
        onOpenModal={handleOpenModal}
      />

      <ListNav
        items={[
          { id: 0, label: 'users', onClick: onItemClick },
          { id: 1, label: 'roles', onClick: onItemClick },
          { id: 2, label: 'rules', onClick: onItemClick }
        ]}
      />

      {isOpenModal && (
        <ModalFormInput
          isOpen={isOpenModal}
          modalTitle={modalTitle}
          confirmText='Save'
          onClose={handleCloseModal}
          onConfirmText={handleOnSubmit}
          onChangeText={handleInputChange}
        />
      )}
    </div>
  );
};

export default Drawer;
