interface IModalHeaderProps {
  type?: string;
  modalTitle?: string;
  modalDesc?: string;
  onClose?: () => void;
}

const ModalHeader = ({
  type,
  modalTitle,
  modalDesc,
  onClose
}: IModalHeaderProps) => {
  return (
    <div className={`modal-${type}-header`}>
      {type === 'confirm' ? (
        <>
          <h2 className='modal-title'>{modalTitle}</h2>
          <p className='modal-desc'>{modalDesc}</p>
        </>
      ) : (
        <>
          <p className='modal-title'>{modalDesc}</p>
          <span className='icon-close' onClick={onClose}></span>
        </>
      )}
    </div>
  );
};

export default ModalHeader;
