import { useState } from 'react';

// CSS
import '@components/DataDisplay/Drawer/Drawer.css';

// Components
import Popover from '@components/DataDisplay/Popover';
import ListNav from '@components/DataDisplay/ListNav';
import Modal from '@components/DataDisplay/Modal';

// Icons
import plusIcon from '@assets/images/plus-icon.svg';

type TAnchor = 'top' | 'left' | 'bottom' | 'right';

interface IDrawerProps {
  anchor?: TAnchor;
  text?: string;
  icon?: string;
  popperOption: IPopoverOption[];
  onItemClick: (data: string) => void;
  onSubmit: (data: string) => void;
}

const Drawer = ({
  anchor = 'left',
  text = 'New',
  icon = plusIcon,
  popperOption,
  onItemClick,
  onSubmit
}: IDrawerProps) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  const handleInputChange = (value: string) => {
    setTextInput(value);
  };

  const handleOpenModal = (option: IPopoverOption) => {
    setModalDesc(option.label || '');
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
        options={popperOption}
        onOpenModal={handleOpenModal}
      />

      <ListNav
        items={['users', 'roles', 'rules']}
        onClick={onItemClick}
      />

      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          type='submit'
          modalDesc={modalDesc}
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
