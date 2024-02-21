import { ReactNode } from 'react';

// CSS
import '@components/Inputs/Button/Button.css';

// Types
type TVariant = 'primary' | 'secondary';
type TButtonSize = 'sm' | 'md' | 'lg';

interface IButtonProps {
  variants: TVariant;
  size: TButtonSize;
  icon?: string;
  additionalClass?: string;
  children: ReactNode;
  form?: string;
  onClick?: () => void;
}

const Button = ({
  variants,
  size,
  icon,
  additionalClass,
  children,
  form,
  onClick
}: IButtonProps) => {
  return (
    <button
      className={`btn btn-${variants} btn-${size} ${additionalClass}`}
      form={form}
      onClick={onClick}
    >
      {icon &&
        <img
          className='btn-icon'
          alt='icon'
          src={icon}
        />}
      {children}
    </button>
  );
};

export default Button;
