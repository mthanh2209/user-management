// CSS
import '@components/Avatar/Avatar.css';

type TAvatarSize = 'sm' | 'md' | 'lg';

interface IAvatar {
  src?: string;
  alt?: string;
  bgColor?: string;
  size: TAvatarSize;
  additionalClass?: string;
}

const Avatar = ({
  src,
  alt,
  bgColor,
  size,
  additionalClass
}: IAvatar) => {
  const firstLetter = alt?.charAt(0).toUpperCase();

  return (
    <div
      className={`avatar avatar-${size} ${additionalClass}`}
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
