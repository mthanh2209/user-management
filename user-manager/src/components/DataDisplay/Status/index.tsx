// Components
import '@components/DataDisplay/Status/Status.css';

interface IStatus {
  isActive?: boolean;
  active?: string;
  notActive?: string;
}

const Status = ({
  isActive,
  active = 'Active',
  notActive = 'Not active'
}: IStatus) => (
  <span
    className={`status status-${isActive
      ? 'active' : 'not-active'}`}>
    {isActive ? active : notActive}
  </span>
);

export default Status;
