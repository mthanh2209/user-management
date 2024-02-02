import { useEffect, useState } from 'react';

// Components
import ItemNav from '@components/DataDisplay/ItemNav/index';

// Icons
import userIconSelected from '@assets/images/user-icon-selected.svg';
import userIcon from '@assets/images/user-icon.svg';

interface IListNav {
  items: string[];
  onClick: (key: string) => void;
}

const ListNav = ({
  items,
  onClick
}: IListNav) => {
  const [itemSelected, setItemSelected] = useState<number | null>(null);

  const renderIcon = (type: string, index: number) => {
    if (type === 'users') {
      return itemSelected === index ? userIconSelected : userIcon;
    }
  };

  const handleClickedItem = (item: string, index: number) => {
    setItemSelected(index);
    onClick(item);
  };

  useEffect(() => {
    handleClickedItem('users', 0);
  }, []);

  return (
    <ul>
      {items.map((item, index) => (
        <ItemNav
          key={item}
          additionalClass={
            itemSelected === index
            ? 'selected'
            : ''
          }
          icon={renderIcon(item, index)}
          content={item}
          onClick={() => handleClickedItem(item, index)}
        />
      ))}
    </ul>
  );
};

export default ListNav;
