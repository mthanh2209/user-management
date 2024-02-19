import { Link } from 'react-router-dom';

export interface ItemViewProps {
  icon: string;
  title: string;
  navigation: Array<{
    text: string;
    link: string;
  }>;
}

const ItemView = ({ icon, title, navigation }: ItemViewProps) => {
  return (
    <>
      <div className='info-list-header'>
        <span className={`info-list-icon ${icon}`}></span>
        {title}
      </div>
      <div className='info-list-link'>
        {navigation.map((item, index) => (
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
