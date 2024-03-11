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
          <div
            key={item.id}
            id={item.id}
            onClick={item.onClick}
            className={`text-link ${additionalClass}`}
          >
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemView;
