import {
  useEffect,
  useRef,
  useState
} from 'react';

// CSS
import '@components/Popover/Popover.css';

//Hooks
import { useBackDrop } from '@hooks';

//Components
import { Button } from '@components';

// Types
import { IPopoverOption } from '@types';

interface IPopoverProps {
  isOpen?: boolean;
  icon: string;
  children: string;
  options: IPopoverOption[];
}

const Popover = ({
  isOpen = false,
  icon,
  children = 'New',
  options
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
          {options.map((option) => (
            <button
              key={option.id}
              className='btn-option'
              type='button'
              onClick={option.onClick}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Popover;
