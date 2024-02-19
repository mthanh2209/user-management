import ListView from './ListView';
import { ItemViewProps } from './ListView/ItemView';
import TextView from './TextView';

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
              <ListView key={index} items={item.items as ItemViewProps[]} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default SideBarInfo;
