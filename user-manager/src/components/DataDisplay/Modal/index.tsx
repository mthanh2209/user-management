// CSS
import '@components/DataDisplay/Modal/Modal.css';

const Modal = (children: React.ReactNode) => {
  return <div className={`modal-wrapper`}>{children}</div>;
};

export default Modal;
