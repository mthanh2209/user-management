// CSS
import '@components/DataDisplay/Modal/Modal.css';

interface IModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IModalProps) => {
  return <div className={`modal-wrapper`}>{children}</div>;
};

export default Modal;
