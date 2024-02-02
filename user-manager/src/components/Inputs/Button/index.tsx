import { ReactNode } from 'react';

// CSS
import '@components/Inputs/Button/Button.css';

// Types
type TVariant = 'primary' | 'secondary';
type TButtonSize = 'sm' | 'md' | 'lg';

interface IButtonProps {
  variants: TVariant;
  size: TButtonSize;
  additionalClass?: string;
  children: ReactNode;
  onClick: () => void;
}

const Button = ({
  variants,
  size,
  additionalClass,
  children,
  onClick
}: IButtonProps) => {
  return (
    <button
      className={`btn btn-${variants} btn-${size} ${additionalClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
