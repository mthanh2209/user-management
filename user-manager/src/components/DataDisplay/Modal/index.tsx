import { createPortal } from 'react-dom';

// CSS
import '@components/DataDisplay/Modal/Modal.css';

// Components
import ModalHeader from '@components/DataDisplay/Modal/ModalHeader';
import ModalBody from '@components/DataDisplay/Modal/ModalBody';

// Types
type TModal = 'submit' | 'confirm'

interface IModalProps {
  isOpen?: boolean;
  type?: TModal;
  modalTitle?: string;
  modalDesc?: string;
  confirmText?: string;
  denyText?: string;
  onClose?: () => void;
  onConfirmText?: () => void;
  onDenyText?: () => void;
  onChangeText?: (value: string) => void;
}

const Modal = ({
  isOpen,
  type,
  modalTitle,
  modalDesc,
  confirmText,
  denyText,
  onClose,
  onConfirmText,
  onDenyText,
  onChangeText
}: IModalProps) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div className='modal-wrapper'>
            <div className={`modal modal-${type}`}>
              <ModalHeader
                type={type}
                modalTitle={modalTitle}
                modalDesc={modalDesc}
                onClose={onClose}
              />

              <ModalBody
                type={type}
                confirmText={confirmText}
                denyText={denyText}
                onConfirmText={onConfirmText}
                onDenyText={onDenyText}
                onChangeText={onChangeText}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
