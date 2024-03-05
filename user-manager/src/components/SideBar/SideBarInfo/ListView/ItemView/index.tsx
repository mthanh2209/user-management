import { Link } from 'react-router-dom';

// Types
import { ItemViewProps } from '@types';

const ItemView = ({
  icon,
  title,
  additionalClass,
  content
}: ItemViewProps) => {
  return (
    <>
      <div className='info-list-header'>
        <span className={`info-list-icon ${icon}`}></span>
        {title}
      </div>
      <div className='info-list-link'>
        {content?.map((item) => (
          <Link
            key={item.link}
            to={item.link}
            className={`text-link ${additionalClass}`}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ItemView;
