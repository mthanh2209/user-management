import { useEffect, useState } from 'react';

// Components
import ItemNav from '@components/DataDisplay/ItemNav/index';

// Icons
import userIconSelected from '@assets/images/user-icon-selected.svg';
import userIcon from '@assets/images/user-icon.svg';
import shieldIcon from '@assets/images/shield-icon.svg';
import shieldIconSelected from '@assets/images/shield-icon-selected.svg';
import fileCheckIcon from '@assets/images/file-check-icon.svg';
import fileCheckIconSelected from '@assets/images/file-check-icon-selected.svg';

interface ListNavItem {
  label: string;
  action: (data: string) => void;
}

interface IListNav {
  items: ListNavItem[];
}

const ListNav = ({
  items
}: IListNav) => {
  const [itemSelected, setItemSelected] = useState<number | null>(null);

  const renderIcon = (type: string, index: number) => {
    if (type === 'users') {
      return itemSelected === index ? userIconSelected : userIcon;
    }
    if (type === 'roles') {
      return itemSelected === index ? shieldIconSelected : shieldIcon;
    }
    if (type === 'rules') {
      return itemSelected === index ? fileCheckIconSelected : fileCheckIcon;
    }
  };

  const handleClickedItem = (item: string, index: number) => {
    setItemSelected(index);
    items[index].action(item);
  };

  useEffect(() => {
    handleClickedItem(items[0].label, 0);
  }, []);

  return (
    <ul>
      {items.map((item, index) => (
        <ItemNav
          key={item.label}
          additionalClass={
            itemSelected === index
            ? 'selected'
            : ''
          }
          icon={renderIcon(item.label, index)}
          content={item.label}
          onClick={() => handleClickedItem(item.label, index)}
        />
      ))}
    </ul>
  );
};

export default ListNav;
