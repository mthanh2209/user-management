// Components
import '@components/DataDisplay/SideBar/SideBar.css';
import Status from '@components/DataDisplay/Status';
import Avatar from '@components/DataDisplay/Avatar/index';

// Types
import SideBarInfo, { SideBarInfoProps } from './SideBarInfo';

interface ISideBarProps {
  title?: string;
  isActive?: boolean;
  src?: string;
  bgColor: string;
  fullName: string;
  data: SideBarInfoProps['data'];
  onShowPanel: () => void;
}

const InformationSidebar = ({
  title,
  isActive,
  src,
  bgColor,
  fullName,
  data,
  onShowPanel
}: ISideBarProps) => {
  return (
    <article className='sidebar'>
      <header className='sidebar-header'>
        <h2 className='sidebar-title'>{title}</h2>
        <Status isActive={isActive} />
        <span className='edit-icon' onClick={onShowPanel}></span>
      </header>

      <div className='sidebar-info'>
        <Avatar src={src} alt={fullName} bgColor={bgColor} size='lg' />
        <p className='info-name'>{fullName}</p>
      </div>
      <div className='info-list'>
        <SideBarInfo data={data} />
      </div>
    </article>
  );
};

export default InformationSidebar;
