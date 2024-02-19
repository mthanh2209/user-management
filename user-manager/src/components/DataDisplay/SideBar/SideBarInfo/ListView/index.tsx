import ItemView, {
  ItemViewProps
} from '@components/DataDisplay/SideBar/SideBarInfo/ListView/ItemView';

interface ListViewProps {
  items: ItemViewProps[];
}

const ListView = ({ items }: ListViewProps) => {
  return (
    <>
      {items.map(({ icon, title, navigation }, index) => (
        <ItemView
          key={index}
          icon={icon}
          title={title}
          navigation={navigation}
        />
      ))}
    </>
  );
};

export default ListView;
