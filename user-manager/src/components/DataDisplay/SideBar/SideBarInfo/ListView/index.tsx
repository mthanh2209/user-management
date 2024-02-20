// Components
import ItemView from '@components/DataDisplay/SideBar/SideBarInfo/ListView/ItemView';

// Types
import { ItemViewProps } from '@components/DataDisplay/SideBar/SideBarInfo/ListView/ItemView';

interface ListViewProps {
  items: ItemViewProps[];
}

const ListView = ({ items }: ListViewProps) => {
  return (
    <>
      {items.map(({ icon, title, content }, index) => (
        <ItemView
          key={index}
          icon={icon}
          title={title}
          content={content}
        />
      ))}
    </>
  );
};

export default ListView;
