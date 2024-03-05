import { useState } from 'react';
import { createPortal } from 'react-dom';

// Components
import Modal from '@components/Modal';
import { Button, TextField } from '@components';

// Helpers
import { isModalInputValid } from '@helpers';

interface IModalFormInputProps {
  isOpen?: boolean;
  modalTitle?: string;
  confirmText?: string;
  onClose?: () => void;
  onConfirmText?: () => void;
  onChangeText?: (value: string) => void;
}

const ModalFormInput = ({
  isOpen,
  modalTitle,
  confirmText,
  onClose,
  onConfirmText,
  onChangeText
}: IModalFormInputProps) => {
  const [textInput, setTextInput] = useState('');

  const handleInputChange = (value: string) => {
    setTextInput(value);
    onChangeText?.(value);
  };

  const isButtonDisabled = !textInput.trim();

  return (
    <>
      {isOpen &&
        createPortal(
          <Modal>
            <div className={`modal modal-submit`}>
              <div className={`modal-submit-header`}>
                <h2 className='modal-title'>{modalTitle}</h2>
                <span className='icon-close' onClick={onClose}></span>
              </div>
              <div className={`modal-submit-body`}>
                <TextField
                  additionalClass='input-submit'
                  value={textInput}
                  validate={isModalInputValid}
                  onChange={handleInputChange}
                />
                <Button
                  variants='primary'
                  size='sm'
                  children={confirmText}
                  onClick={onConfirmText}
                  isDisable={isButtonDisabled}
                />
              </div>
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ModalFormInput;
