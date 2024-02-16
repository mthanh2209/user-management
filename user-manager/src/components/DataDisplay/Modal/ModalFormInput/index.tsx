import { createPortal } from 'react-dom';

// Components
import Modal from '@components/DataDisplay/Modal';
import Button from '@components/Inputs/Button';
import TextField from '@components/Inputs/TextField';

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
                  onChange={onChangeText}
                />
                <Button
                  variants='primary'
                  size='sm'
                  children={confirmText}
                  onClick={onConfirmText}
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
