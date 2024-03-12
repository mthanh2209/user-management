import { useState } from 'react';

// Components
import ItemNav from '@components/ItemNav';

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
  itemSelected: number;
}

const ListNav = ({ items, itemSelected }: IListNav) => {
  const [selected, setSelected] = useState<number>(itemSelected);

  const renderIcon = (type: string, index: number) => {
    if (type === 'users') {
      return selected === index ? userIconSelected : userIcon;
    }
    if (type === 'roles') {
      return selected === index ? shieldIconSelected : shieldIcon;
    }
    if (type === 'rules') {
      return selected === index ? fileCheckIconSelected : fileCheckIcon;
    }
  };

  const handleClickedItem = (item: IItemNav) => () => {
    setSelected(item.id);
    item.onClick();
  };

  return (
    <ul>
      {items.map((item, index) => (
        <ItemNav
          key={item.id}
          additionalClass={selected === item.id ? 'selected' : ''}
          icon={renderIcon(item.label, index)}
          content={item.label}
          onClick={handleClickedItem(item)}
        />
      ))}
    </ul>
  );
};

export default ListNav;
