// CSS
import '@components/RadioButton/RadioButton.css';

interface IRadioButton {
  id: string;
  name?: string;
  label: string;
  value?: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  id,
  name,
  label,
  value,
  isChecked,
  onChange
}: IRadioButton) => {
  return (
    <div className='radio-button'>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className='radio-button-input'
      />
      <label htmlFor={id} className='radio-button-label'>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
