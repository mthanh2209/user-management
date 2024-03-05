// CSS
import '@components/Status/Status.css';

interface IStatusProps {
  isActive?: boolean;
  active?: string;
  notActive?: string;
}

const Status = ({
  isActive,
  active = 'Active',
  notActive = 'Not active'
}: IStatusProps) => (
  <span
    className={`status status-${isActive
      ? 'active' : 'not-active'}`}>
    {isActive ? active : notActive}
  </span>
);

export default Status;
