// CSS
import '@components/DataDisplay/Avatar/Avatar.css';

// Helpers
import { capitalizeLetter } from '@helpers';

type TAvatarSize = 'sm' | 'md' | 'lg';

interface IAvatar {
  src?: string;
  alt: string;
  bgColor: string;
  size: TAvatarSize;
}

const Avatar = ({
  src,
  alt,
  bgColor,
  size
}: IAvatar) => {
  const firstLetter = capitalizeLetter(alt.charAt(0));

  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ backgroundColor: bgColor }}
    >
      {src
        ? <img
          className='avatar-image'
          src={src}
          alt={alt}
          />
        : firstLetter}
    </div>
  );
};

export default Avatar;
