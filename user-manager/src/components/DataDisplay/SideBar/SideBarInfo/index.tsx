// Components
import ListView from '@components/DataDisplay/SideBar/SideBarInfo/ListView';
import TextView from '@components/DataDisplay/SideBar/SideBarInfo/TextView';

// Types
import { ItemViewProps } from '@types';

// Constants
import { INFO_TYPE } from '@constants';

export interface SideBarInfoProps {
  data: Array<{
    type: string;
    [key: string]: any;
  }>;
}

const SideBarInfo = ({ data }: SideBarInfoProps) => {
  return (
    <div>
      {data.map((item) => {
        switch (item.type) {
          case INFO_TYPE.TEXT_VIEW:
            return (
              <TextView
                key={item.id}
                icon={item.icon}
                title={item.title}
                content={item.content}
              />
            );
          case INFO_TYPE.LIST_VIEW:
            return (
              <ListView
                key={item.id}
                items={item.content as ItemViewProps[]}
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
