// CSS
import '@components/SideBar/SideBar.css';

// Components
import { Status, Avatar } from '@components';
import SideBarInfo, { SideBarInfoProps } from '@components/SideBar/SideBarInfo';

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
