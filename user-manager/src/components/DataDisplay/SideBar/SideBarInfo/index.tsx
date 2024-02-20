// Components
import ListView from '@components/DataDisplay/SideBar/SideBarInfo/ListView';
import TextView from '@components/DataDisplay/SideBar/SideBarInfo/TextView';

// Types
import { ItemViewProps } from '@components/DataDisplay/SideBar/SideBarInfo/ListView/ItemView';

export interface SideBarInfoProps {
  data: Array<{
    type: string;
    [key: string]: any;
  }>;
}

const SideBarInfo = ({ data }: SideBarInfoProps) => {
  return (
    <div>
      {data.map((item, index) => {
        switch (item.type) {
          case 'textView':
            return (
              <TextView
                key={index}
                icon={item.icon}
                title={item.title}
                content={item.content}
              />
            );
          case 'listView':
            return (
              <ListView
                key={index}
                items={item.items as ItemViewProps[]}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SideBarInfo;
