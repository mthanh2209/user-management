// CSS
import '@components/Tab/Tab.css';

interface ITabPanel {
  title: string;
  isActive: boolean;
  index: number;
  onClick: (index: number) => void;
}

const TabPanel = ({
  title,
  isActive,
  index,
  onClick
}: ITabPanel) => {
  const handleTabClick = () => {
    onClick(index)
  }

  return (
  <button
    className={`tab ${isActive ? 'active' : ''}`}
    type='button'
    onClick={handleTabClick} >
    {title}
  </button>
  )
}

export default TabPanel;
