import { useState } from 'react';

// Components
import ItemNav from '@components/DataDisplay/ItemNav/index';

// Icons
import userIconSelected from '@assets/images/user-icon-selected.svg';
import userIcon from '@assets/images/user-icon.svg';
import shieldIcon from '@assets/images/shield-icon.svg';
import shieldIconSelected from '@assets/images/shield-icon-selected.svg';
import fileCheckIcon from '@assets/images/file-check-icon.svg';
import fileCheckIconSelected from '@assets/images/file-check-icon-selected.svg';

// Types
import { IItemNav } from '@types';

interface IListNav {
  items: IItemNav[];
}

const ListNav = ({ items }: IListNav) => {
  const [itemSelected, setItemSelected] = useState<number | null>(
    items.length > 0 ? items[0].id : null
  );

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

  const handleClickedItem = (item: IItemNav) => () => {
    setItemSelected(item.id);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <ItemNav
          key={item.id}
          additionalClass={itemSelected === item.id ? 'selected' : ''}
          icon={renderIcon(item.label, index)}
          content={item.label}
          onClick={handleClickedItem(item)}
        />
      ))}
    </ul>
  );
};

export default ListNav;
