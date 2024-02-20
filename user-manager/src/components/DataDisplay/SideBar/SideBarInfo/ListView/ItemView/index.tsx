import { Link } from 'react-router-dom';

export interface ItemViewProps {
  icon: string;
  title: string;
  content: Array<{
    text: string;
    link: string;
  }>;
}

const ItemView = ({
  icon,
  title,
  content
}: ItemViewProps) => {
  return (
    <>
      <div className='info-list-header'>
        <span className={`info-list-icon ${icon}`}></span>
        {title}
      </div>
      <div className='info-list-link'>
        {content.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className='text-link'
          >
            {item.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ItemView;
