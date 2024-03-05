import { FormEvent } from 'react';

// CSS
import '@components/TextArea/TextArea.css';

interface ITextArea {
  value?: string;
  placeholder?: string;
  additionalClass?: string;
  onChange?: (value: string) => void;
}

const TextArea = ({
  value,
  placeholder,
  additionalClass,
  onChange
}: ITextArea) => {
  const handleOnChange = (event: FormEvent<HTMLTextAreaElement>) => {
    onChange?.(event.currentTarget.value);
  };

  return (
    <textarea
      name='name'
      id='id'
      className={`text-area ${additionalClass}`}
      onChange={handleOnChange}
      value={value}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
