import { createPortal } from 'react-dom';

// Components
import Modal from '@components/Modal';
import { Button } from '@components';

interface IModalConfirmProps {
  isOpen?: boolean;
  modalTitle?: string;
  modalDesc?: string;
  confirmText?: string;
  denyText?: string;
  onConfirmText?: () => void;
  onDenyText?: () => void;
}

const ModalConfirm = ({
  isOpen = true,
  modalTitle,
  modalDesc,
  confirmText,
  denyText,
  onConfirmText,
  onDenyText
}: IModalConfirmProps) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <Modal>
            <div className={`modal modal-confirm`}>
              <div className={`modal-confirm-header`}>
                <h2 className='modal-title'>{modalTitle}</h2>
                <p className='modal-desc'>{modalDesc}</p>
              </div>
              <div className={`modal-confirm-body`}>
                <Button
                  variants='secondary'
                  size='sm'
                  children={denyText}
                  onClick={onDenyText}
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

export default ModalConfirm;
