// Components
import Button from '@components/Inputs/Button/index';
import TextField from '@components/Inputs/TextField/index';

interface IModalBodyProps {
  type?: string;
  confirmText?: string;
  denyText?: string;
  onConfirmText?: () => void;
  onDenyText?: () => void;
  onChangeText?: (value: string) => void;
}

const ModalBody = ({
  type,
  confirmText,
  denyText,
  onConfirmText,
  onDenyText,
  onChangeText
}: IModalBodyProps) => {
  return (
    <div className={`modal-${type}-body`}>
      {type === 'confirm' ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ModalBody;
