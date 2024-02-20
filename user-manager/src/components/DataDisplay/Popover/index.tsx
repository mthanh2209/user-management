import { useEffect, useRef, useState } from 'react';

// CSS
import '@components/DataDisplay/Popover/Popover.css';

//Hooks
import useBackDrop from '@hooks/useBackDrop';

//Components
import Button from '@components/Inputs/Button';

// Types
import { IPopoverOption } from '@types';

interface IPopoverProps {
  isOpen?: boolean;
  icon: string;
  children: string;
  options: IPopoverOption[];
  onOpenModal: (option: IPopoverOption) => void;
}

const Popover = ({
  isOpen = false,
  icon,
  children = 'New',
  options,
  onOpenModal
}: IPopoverProps) => {
  const optionRef = useRef<HTMLDivElement | null>(null);
  const [isShowOption, setShowOption] = useState(false);

  const closeOption = () => {
    setShowOption(false);
  };

  const handleTogglePopover = () => {
    setShowOption(true);
  };

  useBackDrop({
    ref: optionRef,
    callback: closeOption
  });

  useEffect(() => {
    setShowOption(isOpen);
  }, [isOpen]);

  const handleOptionClick = (option: IPopoverOption) => () => {
    onOpenModal(option);
  };

  return (
    <div className='popover' ref={optionRef}>
      <Button
        variants='primary'
        size='lg'
        icon={icon}
        additionalClass='btn-popover'
        children={children}
        onClick={handleTogglePopover}
      />

      {isShowOption && (
        <div className='popover-option'>
          {options.map((option, index) => (
            <button
              key={index}
              className='btn-option'
              type='button'
              onClick={handleOptionClick(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popover;
