// Components
import ItemView from '@components/SideBar/SideBarInfo/ListView/ItemView';

// Types
import { ItemViewProps } from '@types';

interface ListViewProps {
  items: ItemViewProps[];
}

const ListView = ({ items }: ListViewProps) => {
  return (
    <>
      {items.map((item) => (
        <ItemView
          key={item.title}
          icon={item.icon}
          title={item.title}
          content={item.content}
        />
      ))}
    </>
  );
};

export default ListView;
