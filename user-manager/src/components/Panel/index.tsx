import { useState } from 'react';
// CSS
import '@components/Panel/Panel.css';

// Components
import { Tab } from '@components';

// Interfaces
interface IContent {
  content: React.ReactNode;
  title: string;
}

interface IPanelProp {
  tabs: IContent[];
  onReturnClick: () => void;
}

const Panel = ({
  tabs,
  onReturnClick,
}: IPanelProp) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleActiveTab = (index: number) => {
    setActiveTabIndex(index);
  };
  const content = tabs[activeTabIndex].content;

  return (
    <div className='panel-wrapper'>
      <div className='panel-edit'>
        <span className='back-icon' onClick={onReturnClick}></span>

        {tabs.map((item, index) => (
          <Tab
            key={index}
            title={item.title}
            isActive={activeTabIndex === index}
            index={index}
            onClick={handleActiveTab}
          />
        ))}
      </div>
      {content}
    </div>
  );
};

export default Panel;
