// CSS
import '@components/DataDisplay/RadioButton/RadioButton.css';

interface IRadioButton {
  id: string;
  name?: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const RadioButton = ({
  id,
  name,
  label,
  isChecked,
  onChange
}: IRadioButton) => {
  return (
    <div className='radio-button'>
      <input
        type='radio'
        name={name}
        id={id}
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
