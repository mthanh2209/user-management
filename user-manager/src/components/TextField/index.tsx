import { FormEvent, useState } from 'react';

// CSS
import '@components/TextField/TextField.css';

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
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeInput = (event: FormEvent<HTMLInputElement>) => {
    onChange?.(event.currentTarget.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const error = isFocused && validate ? validate(value || '') : undefined;

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
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {error && <span className='error-message'>{error}</span>}
      </div>
    </>
  );
};

export default TextField;
