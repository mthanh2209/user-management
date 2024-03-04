import { useState } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';

interface IColorField {
  label: string;
  bgColor: string;
  onChange: (value: string) => void;
}

const ColorField = ({
  label,
  bgColor, 
  onChange
}: IColorField) => {
  const [color, setColor] = useState(bgColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);

    if (onChange) onChange(color.hex);
  };

  return (
    <>
      <label className='label-input'>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type='text'
          value={color}
          readOnly
          className='color-wrapper text-field input-text'
        />
        <div
          className='color-field-wrapper'
          style={{ backgroundColor: color }}
          onClick={handleClick}
        />
        {showColorPicker ? (
          <div style={{ marginLeft: '12px' }} onClick={handleClose}>
            <TwitterPicker color={color} onChange={handleChange} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ColorField;
