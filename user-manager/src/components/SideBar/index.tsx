import { useContext } from 'react';

// CSS
import '@components/SideBar/SideBar.css';

// Components
import { Status, Avatar } from '@components';
import SideBarInfo, { SideBarInfoProps } from '@components/SideBar/SideBarInfo';

// Services
import { getRules } from '@services';

// Stores
import { Context } from '@stores';

interface ISideBarProps {
  ruleId?: number;
  title?: string;
  isActive?: boolean;
  isShowIcon?: boolean;
  isShowStatus?: boolean;
  isBackIcon?: boolean;
  additionalClass?: string;
  src?: string;
  bgColor?: string;
  fullName?: string;
  data: SideBarInfoProps['data'];
  onShowPanel?: () => void;
}

const InformationSidebar = ({
  ruleId,
  title,
  isActive,
  isShowIcon = true,
  isShowStatus = false,
  isBackIcon = false,
  additionalClass,
  src,
  bgColor,
  fullName,
  data,
  onShowPanel
}: ISideBarProps) => {
  const { data: rulesData } = getRules();
  const { setSelectedRow } = useContext(Context);

  const handleBack = () => {
    const ruleIndex = rulesData?.findIndex((rule) => rule.id === ruleId) ?? -1;
    const selectedIndex = ruleIndex >= 0 ? ruleIndex + 1 : -1;

    setSelectedRow({ index: selectedIndex, data: null });
  };

  return (
    <article className={`sidebar ${additionalClass}`}>
      <header className='sidebar-header'>
        {isBackIcon && (
          <span className='back-icon' onClick={handleBack}></span>
        )}
        <h2 className='sidebar-title'>{title}</h2>
        {isShowStatus && <Status isActive={isActive} />}
        {isShowIcon && (
          <span className='edit-icon' onClick={onShowPanel}></span>
        )}
      </header>

      {isShowIcon && (
        <div className='sidebar-info'>
          <Avatar src={src} alt={fullName} bgColor={bgColor} size='lg' />
          <p className='info-name'>{fullName}</p>
        </div>
      )}
      <div className='info-list'>
        <SideBarInfo data={data} />
      </div>
    </article>
  );
};

export default InformationSidebar;
