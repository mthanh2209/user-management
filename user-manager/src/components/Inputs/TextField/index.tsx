import { FormEvent } from 'react';

// CSS
import '@components/Inputs/TextField/TextField.css';

// Types
type TInput = 'input-text' | 'input-submit' | 'input-search';

interface ITextFieldProps {
  isShowLabel?: boolean;
  label?: string;
  additionalClass?: TInput;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  validate?: (value: string) => string | undefined;
}

const TextField = ({
  isShowLabel,
  label,
  additionalClass,
  value,
  placeholder,
  onChange,
  validate
}: ITextFieldProps) => {
  const handleChangeInput = (event: FormEvent<HTMLInputElement>) => {
    onChange?.(event.currentTarget.value);
  };

  const error = validate ? validate(value || '') : undefined;

  return (
    <>
      <label className={`label-input ${!isShowLabel && 'hide'}`}>{label}</label>

      <div className='input-wrapper'>
        <input
          type='text'
          className={`text-field ${additionalClass}`}
          value={value}
          placeholder={placeholder}
          onChange={handleChangeInput}
        />

        {error && <span className='error-message'>{error}</span>}
      </div>
    </>
  );
};

export default TextField;
